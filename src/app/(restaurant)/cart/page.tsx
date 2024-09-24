"use client";

import React, { useState } from "react";
import { CartProductCard } from "@/components"; // Importamos el componente CartProductCard

import Link from "next/link";
import clsx from "clsx"; // Importamos clsx para manejar clases condicionales
import { redirect } from "next/navigation";
import { initialData } from "@/seed/seed";

// Datos iniciales del carrito
const initialCartData = [
  {
    slug: "lomo-cerdo-bbq",
    cantidad: 2,
    comentario: "Sin cebolla, por favor",
    opcionesPersonalizacion: [{ name: "Salsa BBQ extra", price: 3000 }],
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartData);
  const [totalOrden, setTotalOrden] = useState<number>(0); // Para almacenar el total de la orden
  const [isDelivery, setIsDelivery] = useState<boolean | null>(null); // Almacenar si es servicio a domicilio o consumo en restaurante
  const [errorMessage, setErrorMessage] = useState<string>(""); // Manejar el error si no se selecciona ninguna opción

  // Función para actualizar la cantidad
  const handleUpdateQuantity = (slug: string, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.slug === slug ? { ...item, cantidad: Math.max(newQuantity, 1) } : item
      )
    );
  };

  // Función para actualizar las opciones de personalización
  const handleUpdateOptions = (slug: string, newOptions: { name: string; price: number }[]) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.slug === slug ? { ...item, opcionesPersonalizacion: newOptions } : item
      )
    );
  };

  // Función para actualizar el comentario
  const handleUpdateComment = (slug: string, newComment: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.slug === slug ? { ...item, comentario: newComment } : item))
    );
  };

  // Función para eliminar un producto del carrito
  const handleRemove = (slug: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.slug !== slug));
  };

  if (initialCartData.length === 0){
    redirect("/empty")
  };
   
  

  // Función para actualizar el total de un producto específico
  const handleUpdateTotal = (slug: string, total: number) => {
    // Recalculamos el total de la orden sumando los totales individuales
    const nuevoTotal = cartItems.reduce((acc, item) => {
      // Buscamos el producto en initialData.products usando el slug
      const product = initialData.products.find((product) => product.slug === item.slug);
      if (!product) return acc; // Si el producto no existe, continuamos

      // Sumamos el total del producto o usamos el total pasado como parámetro
      const precioBase = product.precio * item.cantidad;
      const precioAdiciones = item.opcionesPersonalizacion
        ? item.opcionesPersonalizacion.reduce((totalAdiciones, opcion) => totalAdiciones + opcion.price, 0)
        : 0;

      return acc + (item.slug === slug ? total : precioBase + precioAdiciones);
    }, 0);

    setTotalOrden(nuevoTotal);
  };

  // Función para manejar la selección de servicio a domicilio o restaurante
  const handleOptionChange = (option: boolean) => {
    setIsDelivery(option); // Actualizamos el estado según la opción seleccionada
    setErrorMessage(""); // Limpiamos el mensaje de error si el usuario selecciona una opción
  };

  // Función para validar antes de continuar con la orden
  const handleContinue = () => {
    if (isDelivery === null) {
      setErrorMessage("Por favor selecciona una opción antes de continuar.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Tu Carrito</h1>
      {cartItems.map((item, index) => {
        // Buscamos el producto en initialData.products usando el slug
        const product = initialData.products.find((product) => product.slug === item.slug);

        // Si el producto no existe
        if (!product) return null;

        return (
          <CartProductCard
            key={index}
            product={product} // El producto encontrado
            cantidad={item.cantidad}
            comentario={item.comentario}
            opcionesPersonalizacion={item.opcionesPersonalizacion}
            onUpdateQuantity={handleUpdateQuantity}
            onUpdateOptions={handleUpdateOptions}
            onUpdateComment={handleUpdateComment}
            onRemove={handleRemove}
            onUpdateTotal={handleUpdateTotal} // Aquí pasamos la función onUpdateTotal
          />
        );
      })}

      {/* Resumen del total de la orden */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold">Total de la orden: ${totalOrden.toFixed(2)}</h2>
      </div>

      {/* Sección de selección para consumo o domicilio */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">¿Cómo será tu pedido?</h3>

        <div className="flex flex-col mt-4 space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="orderType"
              value="restaurant"
              onChange={() => handleOptionChange(false)}
              checked={isDelivery === false}
              className="mr-2"
            />
            Consumo en Restaurante
          </label>

          <label className="flex items-center">
            <input
              type="radio"
              name="orderType"
              value="delivery"
              onChange={() => handleOptionChange(true)}
              checked={isDelivery === true}
              className="mr-2"
            />
            Servicio a Domicilio
          </label>
        </div>

        {/* Mensaje de error */}
        {errorMessage && (
          <p className="text-red-600 mt-2 text-sm">{errorMessage}</p>
        )}

        {/* Botón de continuar */}
        <div className="mt-4">
          <Link
            href={isDelivery ? "/checkout/address" : "/checkout"}
            passHref
          >
            <button
              className={clsx(
                "px-6 py-2 rounded-lg font-bold text-white",
                {
                  "bg-red-600 hover:bg-red-700": isDelivery !== null, // Activado si se selecciona una opción
                  "bg-gray-300 cursor-not-allowed": isDelivery === null, // Desactivado si no se selecciona una opción
                }
              )}
              onClick={handleContinue}
              disabled={isDelivery === null} // Deshabilitar el botón si no se selecciona una opción
            >
              Continuar con la orden
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
