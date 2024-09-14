"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { Product } from "@/interfaces";
import { PersonalizationOptions, QuantitySelector } from "@/components";

interface CartProductCardProps {
  product: Product;
  cantidad: number;
  comentario?: string;
  opcionesPersonalizacion?: { name: string; price: number }[];
  onUpdateQuantity: (slug: string, newQuantity: number) => void;
  onUpdateOptions: (slug: string, newOptions: { name: string; price: number }[]) => void;
  onUpdateComment: (slug: string, newComment: string) => void;
  onRemove: (slug: string) => void;
  onUpdateTotal: (slug: string, total: number) => void; // Añadimos esta función para actualizar el total
}

export const CartProductCard: React.FC<CartProductCardProps> = ({
  product,
  cantidad,
  comentario,
  opcionesPersonalizacion,
  onUpdateQuantity,
  onUpdateOptions,
  onUpdateComment,
  onRemove,
  onUpdateTotal,
}) => {
  const [total, setTotal] = useState<number>(0);

  // Recalcula el total cuando cambian la cantidad o las opciones
  useEffect(() => {
    const calcularTotal = () => {
      const precioBase = product.precio * cantidad;
      const precioAdiciones = opcionesPersonalizacion
        ? opcionesPersonalizacion.reduce((total, opcion) => total + opcion.price, 0)
        : 0;
      const nuevoTotal = precioBase + precioAdiciones * cantidad;
      setTotal(nuevoTotal);
      onUpdateTotal(product.slug, nuevoTotal); // Actualizamos el total en el componente padre
    };

    calcularTotal();
  }, [cantidad, opcionesPersonalizacion, product.precio, product.slug, onUpdateTotal]);

  return (
    <div className="flex flex-col items-center lg:flex-row lg:items-center justify-between border rounded-lg shadow-md p-4 mb-4 w-full lg:max-w-full">
      {/* Imagen del producto */}
      <div className="w-full lg:w-1/3 flex-shrink-0 relative mb-4 lg:mb-0 flex justify-center">
        <Image
          src={`/imgs/${product.images[0]}`}
          alt={product.titulo}
          width={300}
          height={300}
          className="rounded-lg object-cover"
        />
      </div>

      {/* Detalles del producto */}
      <div className="w-full lg:w-2/3 lg:pl-6 flex flex-col justify-between">
        {/* Título, precio y descripción */}
        <div className="mb-2 w-full">
          <h2 className="text-lg font-bold text-center lg:text-left">{product.titulo}</h2>
          <p className="text-center lg:text-left text-gray-600">{product.description}</p>
          <p className="text-center lg:text-left text-lg font-bold text-red-600 mt-2 lg:mt-0">
            ${product.precio.toFixed(2)}
          </p>
        </div>

        {/* Personalización */}
        <div className="max-h-[120px] overflow-y-auto mb-4 w-full lg:w-auto">
          <PersonalizationOptions
            customizationOptions={product.customizationOptions}
            selectedOptions={opcionesPersonalizacion}
            comment={comentario}
            onUpdateOptions={(newOptions) => onUpdateOptions(product.slug, newOptions)}
            onUpdateComment={(newComment) => onUpdateComment(product.slug, newComment)}
          />
        </div>

        {/* Cantidad seleccionada y eliminar */}
        <div className="flex flex-col lg:flex-row items-center justify-between w-full">
          {/* Cantidad */}
          <QuantitySelector
            inicio={cantidad}
            onQuantityChange={(newQuantity) => onUpdateQuantity(product.slug, newQuantity)}
          />

          {/* Precio total */}
          <div className="mt-2 lg:mt-0 lg:ml-4 text-lg font-bold text-red-600">
            Total: ${total.toFixed(2)}
          </div>

          {/* Botón para eliminar */}
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center mt-4 lg:mt-0"
            onClick={() => onRemove(product.slug)}
          >
            <FaTrash className="mr-2" />
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};
