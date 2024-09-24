"use client";

import React, { useState } from "react";
import {
  QuantitySelector,
  RecommendationSection,
  PersonalizationOptions,
} from "@/components";
import { CartProduct, Product } from "@/interfaces";
import { useCartStore } from "@/store";
import { v4 as uuidv4 } from "uuid";

interface AddToCartProps {
  product: Product; // El producto es pasado como prop
}

export const AddToCart: React.FC<AddToCartProps> = ({ product }) => {
  const { addProductToCart } = useCartStore();
  const [selectedOptions, setSelectedOptions] = useState<
    { name: string; price: number }[]
  >([]);
  const [comment, setComment] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para manejar el modal

  const AddProductToCartPrueba = () => {
    const productToAdd: CartProduct = {
      cartItemId: uuidv4(), // Generar un identificador único
      id: product.id,
      slug: product.slug,
      title: product.titulo,
      price: product.precio,
      quantity,
      image: product.images[0],
      opcionesPersonalizacion: selectedOptions,
      comentario: comment,
    };
    console.log("Funciona");
    console.log({productToAdd});
    addProductToCart(productToAdd);
    setIsModalOpen(true); // Mostrar el modal

    // Restablecer los estados
    setQuantity(1);
    setComment("");
    setSelectedOptions([]); // Esto también restablece los checks

    // Cerrar el modal automáticamente después de 3 segundos
    setTimeout(() => {
      setIsModalOpen(false);
    }, 3000);
  };

  // Manejador para actualizar la cantidad seleccionada
  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  // Manejador para actualizar las opciones seleccionadas
  const handleUpdateOptions = (
    newOptions: { name: string; price: number }[]
  ) => {
    setSelectedOptions(newOptions);
  };

  // Manejador para actualizar el comentario
  const handleUpdateComment = (newComment: string) => {
    setComment(newComment);
  };

  return (
    <div className="mt-6">
      {/* Selector de cantidad */}
      <QuantitySelector
        inicio={quantity} // Asegúrate de pasar el valor actual de quantity
        onQuantityChange={handleQuantityChange}
      />

      {/* Verifica si existen opciones de personalización y extras */}
      {product.customizationOptions?.extras &&
      product.customizationOptions.extras.length > 0 ? (
        <PersonalizationOptions
          customizationOptions={product.customizationOptions}
          selectedOptions={selectedOptions} // Asegúrate de pasar el valor de selectedOptions
          onUpdateOptions={handleUpdateOptions}
        />
      ) : (
        <p>No hay opciones de personalización disponibles.</p> // Mensaje si no hay extras
      )}

      {/* Caja de recomendación siempre visible */}
      <RecommendationSection
        comment={comment} // Asegúrate de pasar el valor actual de comment
        onUpdateComment={handleUpdateComment}
      />

      {/* Mostrar el botón para agregar al carrito y favorito */}
      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={(e) => {
            e.preventDefault(); // Asegurarte de que el evento no se bloquea.
            AddProductToCartPrueba();
          }}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center"
        >
          Agregar al Carrito
        </button>
        <button
          onClick={() => console.log("PRobando")}
          className="bg-gray-100 p-2 rounded-full hover:bg-red-200"
        >
          ❤️
        </button>
      </div>

      {/* Modal para mostrar la confirmación */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ease-out"
          style={{ opacity: isModalOpen ? 1 : 0 }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg text-center relative animate-fade-in">
            <p className="text-xl font-bold">Producto agregado al carrito!</p>
            <button
              className="bg-red-500 text-white px-6 py-2 mt-4 rounded-lg hover:bg-red-600 transition-colors duration-200"
              onClick={() => setIsModalOpen(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Animaciones personalizadas
<style jsx>{`
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .animate-fade-in {
    animation: fadeIn 0.3s ease-out;
  }
`}</style>
