"use client";

import { FaHeart, FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/interfaces";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [displayImage, setDisplayImage] = useState(product.images[0]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 relative">
      <Link href={`/product/${product.slug}`}>
        {/* Imagen del producto */}
        <div className="relative h-56 w-full">
          <Image
            src={`/imgs/${displayImage}`} // Primera imagen
            alt={product.titulo}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Agregar la propiedad sizes para mejorar el rendimiento
            className="rounded-lg object-cover" // Usar object-cover directamente con Tailwind
            onMouseEnter={() => setDisplayImage(product.images[1])}
            onMouseLeave={() => setDisplayImage(product.images[0])}
          />

          {/* Botón de favoritos en la esquina superior derecha */}
          <button
            onClick={(e) => {
              e.preventDefault(); // Evitar que el link se active al hacer clic en el botón
              toggleFavorite();
            }}
            className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-lg flex items-center justify-center"
          >
            <FaHeart
              className={`text-xl transition-transform duration-300 ease-in-out ${
                isFavorite ? "text-red-600 scale-125" : "text-gray-400"
              }`}
            />
          </button>
        </div>
      </Link>

      {/* Información del producto */}
      <div className="mt-4">
        <h3 className="text-lg font-bold">{product.titulo}</h3>

        {/* Descripción corta */}
        <p className="text-sm text-gray-600">
          {product.description.length > 80
            ? `${product.description.substring(0, 80)}...`
            : product.description}
          {product.description.length > 80 && (
            <Link
              href={`/product/${product.slug}`}
              className="text-red-500 hover:underline ml-1"
            >
              Ver más
            </Link>
          )}
        </p>
      </div>

      {/* Precio y botón de agregar al carrito */}
      <div className="mt-4 flex justify-between items-center">
        {/* Precio en la izquierda */}
        <p className="text-lg font-bold">${product.precio.toFixed(2)}</p>

        {/* Botón de agregar al carrito en la derecha */}
        <button className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 flex items-center">
          <FaShoppingCart className="mr-2" />
          Agregar
        </button>
      </div>
    </div>
  );
};
