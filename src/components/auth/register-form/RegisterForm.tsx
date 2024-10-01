"use client";

import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import clsx from "clsx";
import { registerUser, login } from "@/actions";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
    
    const [errorMessage, setErrorMessage] = useState("")
  const {
    register,
    handleSubmit,
    
    formState: { errors },
  } = useForm<FormInputs>();
  
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage("");
    const { name, email, password } = data;
    // Aquí se enviarán los datos al servidor
    const response = await registerUser(name, email, password );
    if (!response.ok){
        setErrorMessage(response.message)
        return
    };

    await login(email.toLowerCase(), password);
    window.location.replace("/products")
  };

  const handleGoogleRegister = () => {
    // Aquí se manejará la autenticación con Google
  };

  return (
    <div className="md:w-1/2 bg-white flex flex-col justify-center p-8">
      <div className="max-w-md w-full mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">Crear una cuenta</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-bold">
              Nombre
            </label>
            <input
              type="text"
              {...register("name", { required: "El nombre es requerido" })}
              id="name"
              className={clsx(
                "w-full border rounded-lg p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-red-600",
                { "border-red-500": errors.name }
              )}
              placeholder="Ingresa tu nombre"
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block font-bold">
              Correo Electrónico
            </label>
            <input
              {...register("email", {
                required: "El correo es requerido",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Correo no válido",
                },
              })}
              type="email"
              className={clsx(
                "w-full border rounded-lg p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-red-600",
                { "border-red-500": errors.email }
              )}
              placeholder="Ingresa tu correo"
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block font-bold">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "La contraseña es requerida",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 8 caracteres",
                },
              })}
              className={clsx(
                "w-full border rounded-lg p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-red-600",
                { "border-red-500": errors.password }
              )}
              placeholder="Ingresa tu contraseña"
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
            {
                (errorMessage !== "") && (<span className= "text-red-500">{errorMessage}</span>)
            }
            
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
          <Link
            href="/auth/login"
            className="text-red-600 hover:underline ml-1"
          >
            Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  );
};
