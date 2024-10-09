"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CartProduct } from "@/interfaces";
import { useCartStore } from "@/store";
import { PersonalizationOptions, RecommendationSection, QuantitySelector } from "@/components";
import { FiTrash2 } from "react-icons/fi";
import Link from "next/link";

interface CartProductCardProps {
  product: CartProduct;
}

export const CartProductCard: React.FC<CartProductCardProps> = ({ product }) => {
  const { updateProductQuantity, updateProductOptions, updateProductComment, removeProduct } = useCartStore();
  const [total, setTotal] = useState<number>(product.price * product.quantity);

  useEffect(() => {
    const totalAdiciones = product.opcionesPersonalizacion.reduce((sum, option) => sum + option.price, 0);
    const nuevoTotal = (product.price + totalAdiciones) * product.quantity;
    setTotal(nuevoTotal);
  }, [product.quantity, product.opcionesPersonalizacion, product.price]);

  const handleQuantityChange = (newQuantity: number) => {
    updateProductQuantity(product.cartItemId, newQuantity);
  };

  const handleOptionsChange = (newOptions: { name: string; price: number }[]) => {
    updateProductOptions(product.cartItemId, newOptions);
  };

  const handleCommentChange = (newComment: string) => {
    updateProductComment(product.cartItemId, newComment);
  };

  const handleRemove = () => {
    removeProduct(product.cartItemId);
  };

  return (
    <div className="flex flex-col md:flex-row items-start p-4 border rounded-lg shadow-md bg-white relative max-w-full md:max-w-[600px]">
      {/* Imagen del producto centrada verticalmente */}
      <div className="flex-shrink-0 w-full md:w-40 h-40 flex items-center justify-center">
        <Image
          src={`/imgs/${product.image}`}
          alt={product.title}
          width={160}
          height={160}
          className="rounded-lg object-cover"
        />
      </div>

      {/* Detalles del producto */}
      <div className="flex-grow ml-0 md:ml-4 w-full">
        {/* Título y botón de eliminar alineado a la derecha */}
        <div className="flex justify-between items-start w-full">
          <Link href={`/product/${product.slug}`}>
            <h2 className="text-lg font-semibold text-red-500">{product.title}</h2>
          </Link>

          <button
            className="text-red-500 hover:text-red-700 transition-transform transform hover:scale-110"
            onClick={handleRemove}
          >
            <FiTrash2 className="w-7 h-7" />
          </button>
        </div>

        {/* Opciones de personalización con scroll */}
        <div className="mt-2 space-y-2">
          <div className="max-h-24 overflow-y-auto">
            <PersonalizationOptions
              customizationOptions={{ extras: product.opcionesDisponibles || [] }}
              selectedOptions={product.opcionesPersonalizacion}
              onUpdateOptions={handleOptionsChange}
            />
          </div>
        </div>

        {/* Recomendación / comentario */}
        <div className="mt-2 ">
          <RecommendationSection
            comment={product.comentario || ""}
            onUpdateComment={handleCommentChange}
          />
        </div>

        {/* Precio y cantidad en la misma línea */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-500">Total: ${total.toFixed(2)}</p>
          <div className="flex items-center">
            <QuantitySelector
              inicio={product.quantity}
              onQuantityChange={handleQuantityChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
