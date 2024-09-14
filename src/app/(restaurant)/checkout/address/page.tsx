"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx"; // Importamos clsx para manejar clases condicionales

export default function AddressPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    phone: "",
    description: "",
  });

  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.address || !formData.city || !formData.state || !formData.phone) {
      setErrorMessage("Por favor, rellena todos los campos obligatorios.");
      return;
    }
    // Redireccionar a la página de confirmación o procesar la información de la dirección
    console.log("Datos de la dirección enviados:", formData);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Imagen grande para pantallas grandes */}
        <div className="hidden lg:block">
          <Image
            src="/imgs/domicilio.webp" // Cambia esto por el path de la imagen generada
            alt="Entrega a domicilio"
            width={800}
            height={600}
            className="rounded-lg object-cover"
          />
        </div>

        {/* Formulario de dirección */}
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Ingresa tu Dirección de Envío</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Nombre completo <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2"
                placeholder="Juan Pérez"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Dirección <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2"
                placeholder="Calle 123, N° 45"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                Ciudad <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2"
                placeholder="Bogotá"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                Estado/Provincia <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2"
                placeholder="Cundinamarca"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Número de Teléfono <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2"
                placeholder="300 123 4567"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Descripción adicional (Opcional)
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2"
                placeholder="Detalles adicionales sobre la entrega"
                rows={4}
              />
            </div>

            {/* Mensaje de error */}
            {errorMessage && (
              <p className="text-red-600 mb-4 text-sm">{errorMessage}</p>
            )}

            {/* Botón de enviar */}
            <div className="text-center">
              <Link
              href="/checkout"
                type="submit"
                className={clsx(
                  "px-6 py-2 rounded-lg font-bold text-white bg-red-600 hover:bg-red-700",
                  {
                    "cursor-not-allowed": errorMessage, // Deshabilitar el botón si hay error
                  }
                )}
              >
                Continuar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
