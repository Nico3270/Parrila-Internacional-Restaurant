import { ProductGrid } from "@/components";
import { initialData } from "@/interfaces/seed";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const products = initialData.products.filter(product => product.seccion === "Entradas");

export default function FavoritePage() {
  return (
    <div className="container mx-auto p-6">
      {/* Título con Icono */}
      <div className="flex items-center justify-center mb-8">
        <FaHeart className="text-red-500 text-4xl mr-3" />
        <h1 className="text-4xl font-bold text-center">Mis Favoritos</h1>
      </div>

      {/* Si no hay productos en los favoritos */}
      {products.length === 0 ? (
        <div className="text-center">
          <p className="text-xl text-gray-500 mb-4">
            No tienes productos en tus favoritos
          </p>
          {/* Imagen generada por IA */}
          <Image
            src="/imgs/no_favorites.webp" // Coloca aquí la ruta de la imagen generada
            alt="No hay favoritos"
            width={300}   // Ajusta el ancho de la imagen
            height={300}  // Ajusta la altura de la imagen
            className="mx-auto mb-6"
          />
         
          <Link href="/products">
            <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
              Explorar Productos
            </button>
          </Link>
        </div>
      ) : (
        /* Mostrar productos en el grid */
        <ProductGrid products={products} />
      )}
    </div>
  );
}
