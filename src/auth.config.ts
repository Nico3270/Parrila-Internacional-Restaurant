import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { z } from "zod";
import prisma from "./lib/prisma";
import bcryptjs from 'bcryptjs';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.data = user;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.data as any;
      return session;
    },

    async signIn({ account, profile }) {
      // Verificamos que el proveedor es Google
      if (account?.provider === 'google') {
        // Si el perfil existe y el correo no está verificado, lanzamos un error
        if (profile && !profile.email_verified) {
          throw new Error('El correo no está verificado.');
        }

        // Verificamos si el usuario ya existe en la base de datos
        const existingUser = await prisma.user.findUnique({
          where: { email: profile?.email?.toLowerCase() },
        });

        // Si el usuario no existe, lo creamos
        if (!existingUser) {
          await prisma.user.create({
            data: {
              name: profile?.name || '',
              email: profile?.email?.toLowerCase() || '',
              // Contraseña aleatoria ya que no se utiliza en el flujo de Google
              password: bcryptjs.hashSync(Math.random().toString(36).slice(-8)),
            },
          });
        }
      }

      return true;
    },
  },

  providers: [
    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    // Credentials Provider
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        // Buscar el correo y la contraseña
        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        });
        if (!user) return null;

        // Compara las contraseñas
        if (!bcryptjs.compareSync(password, user.password)) return null;

        // Retorna el usuario sin la contraseña
        const { password: _, ...rest } = user;
        console.log(bcryptjs.hashSync(_));

        return rest;
      },
    }),
  ],
};

// Export NextAuth setup
export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
