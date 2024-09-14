"use client";

import React, { useState } from "react";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { initialData } from "@/interfaces/seed";
import { notFound } from "next/navigation";
import {
  ProductGridProduct,
  QuantitySelector,
  PersonalizationOptions,
  RecommendationBox,
  ResponsiveSlideShow // Importamos el nuevo componente
} from "@/components";

interface Props {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: Props) {
  const { slug } = params;
  const product = initialData.products.find((product) => product.slug === slug);
  const productSimilar = initialData.products
    .filter((p) => p.seccion === product?.seccion && p.slug !== slug)
    .slice(0, 4);

  if (!product) {
    notFound();
  }

  const [rating, setRating] = useState<number>(0);
  const [newComment, setNewComment] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<{ name: string; price: number }[]>(
    product?.customizationOptions?.extras || []
  ); // Almacena las opciones seleccionadas
  const [quantity, setQuantity] = useState<number>(1); // Estado para la cantidad seleccionada

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    console.log("Comentario enviado:", newComment);
    console.log("Puntuación:", rating);
    setNewComment("");
    setRating(0);
  };

  // Función para actualizar las opciones de personalización
  const handleUpdateOptions = (newOptions: { name: string; price: number }[]) => {
    setSelectedOptions(newOptions); // Actualizamos las opciones seleccionadas
  };

  // Función para actualizar el comentario
  const handleUpdateComment = (newComment: string) => {
    setNewComment(newComment); // Actualizamos el comentario
  };

  // Función para actualizar la cantidad
  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity); // Actualizamos la cantidad seleccionada
  };

  return (
    <div className="container mx-auto p-4 flex flex-col md:grid md:grid-cols-2 gap-6">
      {/* Imagen del producto */}
      <div className="relative w-full h-[400px] md:h-[500px]">
        <ResponsiveSlideShow images={product.images} title={product.titulo} />
      </div>

      {/* Detalles del producto */}
      <div className="flex flex-col space-y-6 md:space-y-4 md:flex-grow">
        <div>
          <h1 className="text-3xl font-bold">{product.titulo}</h1>
          <p className="text-2xl font-bold text-red-600 mt-2">
            ${product.precio.toFixed(2)}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center">
            <FaShoppingCart className="mr-2" />
            Agregar al Carrito
          </button>
          <button className="bg-gray-100 p-2 rounded-full hover:bg-red-200">
            <FaHeart className="text-red-600" />
          </button>
        </div>

        <div className="flex items-center space-x-6">
          <QuantitySelector inicio={quantity} onQuantityChange={handleQuantityChange} />
        </div>

        <div>
          <h3 className="text-lg font-bold">Descripción</h3>
          <p className="text-gray-700">{product.description}</p>
        </div>

        {/* Mostrar PersonalizationOptions o RecommendationBox */}
        {product.customizationOptions && product.customizationOptions.extras.length > 0 ? (
          <div className="max-h-[150px] overflow-y-auto">
            <PersonalizationOptions
              customizationOptions={product.customizationOptions}
              selectedOptions={selectedOptions} // Opciones seleccionadas
              comment={newComment}             // Comentario
              onUpdateOptions={handleUpdateOptions}  // Función para actualizar opciones
              onUpdateComment={handleUpdateComment}  // Función para actualizar comentario
            />
          </div>
        ) : (
          <RecommendationBox />
        )}
      </div>

      {/* Sección inferior (Comentarios y productos similares) */}
      <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Opiniones */}
        <div className="md:col-span-1">
          <h3 className="text-2xl font-bold">Opiniones</h3>
          <div className="flex items-center my-4">
            <p className="text-lg font-bold">4.5</p>
            <div className="ml-2 flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <FaStar key={i} className="text-yellow-500" />
              ))}
            </div>
            <p className="ml-2 text-sm text-gray-600">(3 opiniones)</p>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <p className="font-bold">Juan Pérez</p>
              <p className="text-sm text-gray-500">02 septiembre 2024</p>
              <p className="text-gray-700">El producto es excelente, muy recomendado.</p>
            </div>
            {/* Más comentarios... */}
          </div>

          {/* Input para nuevo comentario */}
          <div className="mt-4">
            <h4 className="text-lg font-bold">Tu puntuación</h4>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-3xl ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
                >
                  <FaStar />
                </button>
              ))}
            </div>

            <h4 className="text-lg font-bold mt-4">Deja tu comentario</h4>
            <input
              type="text"
              placeholder="Escribe tu comentario..."
              value={newComment}
              onChange={handleCommentChange}
              className="w-full border border-gray-300 rounded-lg p-2 mt-2"
            />
            <button
              onClick={handleCommentSubmit}
              className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Enviar
            </button>
          </div>
        </div>

        {/* Productos Similares */}
        <div className="md:col-span-1">
          <h3 className="text-2xl font-bold">Productos Similares</h3>
          <div className="w-full">
            <ProductGridProduct products={productSimilar} />
          </div>
        </div>
      </div>
    </div>
  );
}
