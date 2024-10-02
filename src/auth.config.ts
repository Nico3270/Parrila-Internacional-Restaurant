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
      // Si el usuario acaba de iniciar sesión
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email?.toLowerCase() }
        });
        if (dbUser) {
          // Guardamos el ID de la base de datos en el token JWT
          token.id = dbUser.id;
          token.data = { ...user, id: dbUser.id }; // Actualizamos el token con la información del usuario en la BD
        }
      }
      return token;
    },

    async session({ session, token }) {
      // Guardamos el ID del token en la sesión
      session.user = token.data as any;

      return session;
    },

    async signIn({ account, profile }) {
      // Si es inicio de sesión con Google
      if (account?.provider === 'google') {
        if (profile && !profile.email_verified) {
          throw new Error('El correo no está verificado.');
        }

        // Buscamos al usuario en la base de datos
        const existingUser = await prisma.user.findUnique({
          where: { email: profile?.email?.toLowerCase() },
        });

        // Si no existe, lo creamos
        if (!existingUser) {
          await prisma.user.create({
            data: {
              name: profile?.name || '',
              email: profile?.email?.toLowerCase() || '',
              // Contraseña aleatoria ya que no se usa en el flujo de Google
              password: bcryptjs.hashSync(Math.random().toString(36).slice(-8)),
              image: profile?.picture // Almacenamos la imagen de perfil de Google si está disponible
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

        // Buscar el correo en la base de datos
        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        });
        if (!user) return null;

        // Comparamos las contraseñas
        const passwordMatch = bcryptjs.compareSync(password, user.password);
        if (!passwordMatch) return null;

        // Retorna el usuario sin la contraseña
        const { password: _, ...rest } = user;

        return rest;
      },
    }),
  ],
};

// Export NextAuth setup
export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
