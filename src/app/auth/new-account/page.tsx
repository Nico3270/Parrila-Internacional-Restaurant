"use client";

import { FaGoogle } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí manejarás el registro del usuario
  };

  const handleGoogleRegister = () => {
    // Aquí se manejará la autenticación con Google
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Columna izquierda - Formulario */}
      <div className="md:w-1/2 bg-white flex flex-col justify-center p-8">
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-center">Crear una cuenta</h1>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label htmlFor="name" className="block font-bold">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-lg p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Ingresa tu nombre"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-bold">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Ingresa tu correo"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block font-bold">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
            >
              Crear cuenta
            </button>
          </form>
          <div className="flex items-center justify-between mt-6">
            <div className="border-t w-full border-gray-300"></div>
            <span className="mx-4">o</span>
            <div className="border-t w-full border-gray-300"></div>
          </div>
          <button
            onClick={handleGoogleRegister}
            className="w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded-lg mt-4 hover:bg-blue-700 transition"
          >
            <FaGoogle className="mr-2" />
            Regístrate con Google
          </button>
          <div className="text-center mt-4">
            <span>¿Ya tienes cuenta?</span>
            <Link href="/auth/login" className="text-red-600 hover:underline ml-1">
              Inicia sesión
            </Link>
          </div>
        </div>
      </div>

      {/* Columna derecha - Imagen */}
      <div className="md:w-1/2 relative hidden md:block bg-gray-100">
        <Image
          src="/imgs/restaurant-register-image.webp" // Coloca aquí la ruta de la imagen del restaurante
          alt="Imagen de Restaurante"
          fill
          style={{ objectFit: "cover" }} // Ajuste para que la imagen no cubra el contenido
          className="rounded-lg"
        />
      </div>
    </div>
  );
}
