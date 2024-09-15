"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { useState } from "react"; // Importamos useState
import { Product } from "@/interfaces";
import { FaChair, FaEdit } from "react-icons/fa";

// Enum para tipo de entrega
enum DeliveryType {
  Restaurante = "Restaurante",
  Domicilio = "Domicilio",
}

// Productos de prueba
const mockProducts: Product[] = [
  {
    description: "Delicioso lomo de cerdo a la parrilla con salsa BBQ.",
    images: ["Lomo de Cerdo BBQ_1.webp", "Lomo de Cerdo BBQ_2.webp"],
    available: true,
    precio: 26000,
    slug: "lomo-cerdo-bbq",
    tags: ["cerdo", "parrilla", "bbq"],
    titulo: "Lomo de Cerdo BBQ",
    seccion: "Platos fuertes",
    tipo: "Comida",
    customizationOptions: {
      extras: [
        { name: "Salsa BBQ extra", price: 3000 },
        { name: "Papas fritas", price: 4000 },
      ],
      choices: [
        {
          name: "Término de cocción",
          values: ["Poco hecho", "Al punto", "Bien hecho"],
        },
      ],
    },
  },
  {
    description: "Delicioso lomo de cerdo a la parrilla con salsa BBQ.",
    images: ["Lomo de Cerdo BBQ_1.webp", "Lomo de Cerdo BBQ_2.webp"],
    available: true,
    precio: 26000,
    slug: "lomo-cerdo-bbq",
    tags: ["cerdo", "parrilla", "bbq"],
    titulo: "Lomo de Cerdo BBQ",
    seccion: "Platos fuertes",
    tipo: "Comida",
    customizationOptions: {
      extras: [
        { name: "Salsa BBQ extra", price: 3000 },
        { name: "Papas fritas", price: 4000 },
      ],
      choices: [
        {
          name: "Término de cocción",
          values: ["Poco hecho", "Al punto", "Bien hecho"],
        },
      ],
    },
  },
];

export default function VerificarOrden() {
  // Simulamos que obtenemos el tipo de entrega de un estado global o local
  const [isDelivery] = useState<DeliveryType>(DeliveryType.Restaurante);

  const totalProductos = mockProducts.length;
  const totalPrecio = mockProducts.reduce(
    (total, product) => total + Number(product.precio),
    0
  );

  return (
    <div className="container mx-auto p-4">
      {/* Título */}
      <h1 className="text-4xl font-bold mb-8 text-center">Verificar Orden</h1>

      {/* Layout de dos columnas en pantallas grandes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Columna izquierda - Productos */}
        <div className="space-y-6">
          <Link
            href="/cart"
            className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 hover:text-red-600 transition-all duration-300 ease-in-out shadow-lg"
          >
            <FaEdit className="mr-2" />
            Editar carro de compras
          </Link>

          {/* Lista de productos */}
          {mockProducts.map((product, index) => (
            <div
              key={index}
              className="flex border rounded-lg shadow-md p-4 items-center space-x-4"
            >
              {/* Imagen del producto */}
              <Image
                src={`/imgs/${product.images[0]}`}
                alt={product.titulo}
                width={150}
                height={150}
                className="rounded-lg"
              />

              {/* Detalles del producto */}
              <div className="flex-1">
                <h2 className="text-lg font-bold">{product.titulo}</h2>
                <p className="text-gray-500">{product.description}</p>

                {/* Extras */}
                <p className="text-sm mt-2">
                  <span className="font-bold">Extras:</span>{" "}
                  {product.customizationOptions?.extras?.map((extra, i) => (
                    <span key={i}>
                      {extra.name} (+${extra.price})
                      {i <
                        (product.customizationOptions?.extras?.length ?? 0) - 1 &&
                        ", "}
                    </span>
                  ))}
                </p>

                <p className="text-sm mt-2">
                  <span className="font-bold">Comentario: </span> Bajo en grasa
                  a termino medio
                </p>
                <p className="font-bold text-red-600 mt-2">
                  ${product.precio.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Columna derecha - Información de Orden */}
        <div className="border rounded-lg shadow-md p-6 space-y-6">
          {/* Título de la sección derecha */}
          <h2 className="text-2xl font-bold mb-4">Información del pedido</h2>

          {/* Condicional entre restaurante o domicilio */}
          {isDelivery === DeliveryType.Restaurante ? (
            <div className="animate__animated animate__fadeIn w-full">
              <label
                htmlFor="mesa"
                className="font-bold text-gray-700 mb-2 block"
              >
                Número de Mesa
              </label>
              <div className="relative w-full">
                <FaChair className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  id="mesa"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-300 transition-all duration-300 ease-in-out shadow-md"
                  placeholder="Ingresa el número de mesa"
                />
              </div>
            </div>
          ) : (
            <div className="animate__animated animate__fadeIn">
              <label className="font-bold text-lg text-gray-700 mb-4 block">
                Dirección de Entrega
              </label>
              <div className="space-y-2 mt-2 bg-gray-100 p-4 rounded-lg shadow-md">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-gray-600">
                    Nombre Completo:
                  </span>
                  <span className="text-gray-800">Juan Pérez</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-gray-600">Dirección:</span>
                  <span className="text-gray-800">Calle 123, Bogotá</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-gray-600">Ciudad:</span>
                  <span className="text-gray-800">Bogotá</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-gray-600">Teléfono:</span>
                  <span className="text-gray-800">+57 300 123 4567</span>
                </div>
              </div>
            </div>
          )}

          {/* Resumen de la orden */}
          <div>
            <h3 className="text-xl font-bold mb-2">Resumen de Orden</h3>
            <p>
              <span className="font-bold">Total de productos:</span>{" "}
              {totalProductos}
            </p>
            <p className="font-bold text-red-600 text-lg">
              Total a pagar: ${totalPrecio.toFixed(2)}
            </p>

            {/* Botón de Confirmación */}
            <button
              className={clsx(
                "mt-4 px-6 py-2 rounded-lg text-white font-bold w-full bg-red-600 hover:bg-gray-800 transition"
              )}
            >
              Confirmar Pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
