"use client";

import { useFormState } from 'react-dom';
import { authenticate } from '@/actions'; // Supongo que tienes una acción de autenticación
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";


export const LoginForm = () => {
  // `useFormState` maneja el estado del formulario, como la autenticación
  const [state, dispatch] = useFormState(authenticate, undefined);
  console.log({state});


  const handleGoogleLogin = () => {
    // Aquí se manejará la autenticación con Google
  };

  return (
    <div className="md:w-1/2 bg-white flex flex-col justify-center p-8">
      <div className="max-w-md w-full mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">Iniciar Sesión</h1>
        <form action={dispatch} className="space-y-4"> {/* Mantenemos `dispatch` en el action */}
          <div>
            <label htmlFor="email" className="block font-bold">
              Correo Electrónico
            </label>
            <input
              type="email"
              name="email" // Cambiamos a `name` en lugar de `id` para que el FormData pueda leer correctamente los valores
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
              name="password" // Cambiamos a `name` en lugar de `id` por la misma razón
              className="w-full border rounded-lg p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>Recuérdame</span>
            </label>
            <Link href="/forgot-password" className="text-red-600 hover:underline">
              Olvidé mi contraseña
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
          >
            Iniciar Sesión
          </button>
        </form>
        <div className="flex items-center justify-between mt-6">
          <div className="border-t w-full border-gray-300"></div>
          <span className="mx-4">o</span>
          <div className="border-t w-full border-gray-300"></div>
        </div>
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded-lg mt-4 hover:bg-blue-700 transition"
        >
          <FaGoogle className="mr-2" />
          Iniciar con Google
        </button>
        <div className="text-center mt-4">
          <span>¿No tienes cuenta?</span>
          <Link href="/auth/new-account" className="text-red-600 hover:underline ml-1">
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  );
};
