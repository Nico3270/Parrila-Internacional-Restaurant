"use client";

import { FaChair } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore, usePreferenceDelivey, useAddressStore } from "@/store";
import { Precio } from "../ui/precio/Precio";

export const OrderCheckoutSummary = () => {
  const preference = usePreferenceDelivey((state) => state.preference);
  const totalPrecio = useCartStore((state) => state.getTotalPrice());
  const cartItems = useCartStore((state) => state.cart);
  const address = useAddressStore((state) => state.address);

  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false); // Estado de montaje del cliente
  const [mesa, setMesa] = useState(""); // Estado para el número de mesa
  const [error, setError] = useState(""); // Estado para mostrar mensajes de error

  useEffect(() => {
    setIsMounted(true); // Marcar que el componente está montado en el cliente
  }, []);

  // Si la preferencia es "delivery" pero no hay dirección, redirigir
  useEffect(() => {
    if (isMounted && preference === "delivery" && !address?.address) {
      router.push("/checkout/address");
    }
  }, [isMounted, preference, address, router]);

  const handleConfirmOrder = () => {
    if (preference === "restaurant" && mesa.trim() === "") {
      setError("Por favor, ingresa el número de mesa.");
    } else {
      // Lógica para confirmar el pedido
      setError(""); // Limpiar el error si está todo bien
      // Aquí puedes proceder a la lógica de confirmación
    }
  };

  // Evitar la renderización del contenido hasta que el cliente esté montado
  if (!isMounted) {
    return null; // No renderiza nada hasta que el cliente esté listo
  }

  return (
    <div className="border rounded-lg shadow-md p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Información del pedido</h2>

      {preference === "restaurant" ? (
        <div className="animate__animated animate__fadeIn w-full">
          <label htmlFor="mesa" className="font-bold text-gray-700 mb-2 block">
            Número de Mesa
          </label>
          <div className="relative w-full">
            <FaChair className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              id="mesa"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-300 transition-all duration-300 ease-in-out shadow-md"
              placeholder="Ingresa el número de mesa"
              value={mesa}
              onChange={(e) => setMesa(e.target.value)} // Actualizar el estado del número de mesa
            />
          </div>
          {error && (
            <p className="text-red-600 mt-2">{error}</p> // Mostrar el error si no se ingresa el número de mesa
          )}
        </div>
      ) : (
        <div className="animate__animated animate__fadeIn">
          <label className="font-bold text-lg text-gray-700 mb-4 block">
            Dirección de Entrega
          </label>
          <div className="space-y-2 mt-2 bg-gray-100 p-4 rounded-lg shadow-md">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-gray-600">Nombre Completo:</span>
              <span className="text-gray-800">{address?.name || "N/A"}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-gray-600">Dirección:</span>
              <span className="text-gray-800">{address?.address || "N/A"}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-gray-600">Ciudad:</span>
              <span className="text-gray-800">{address?.city || "N/A"}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-gray-600">Teléfono:</span>
              <span className="text-gray-800">{address?.phone || "N/A"}</span>
            </div>
          </div>
        </div>
      )}

      <div>
        <h3 className="text-xl font-bold mb-2">Resumen de Orden</h3>
        {cartItems.map((product) => (
          <p key={product.cartItemId}>
            <span className="font-bold">{product.quantity} - </span>
            {product.title}
          </p>
        ))}
        <p className="font-bold text-red-600 text-lg flex items-center">
          Total a pagar: <Precio value={totalPrecio} />
        </p>
        <button
          className="mt-4 px-6 py-2 rounded-lg text-white font-bold w-full bg-red-600 hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={handleConfirmOrder}
          disabled={preference === "restaurant" && mesa.trim() === ""} // Desactivar si no hay mesa
        >
          Confirmar Pedido
        </button>
      </div>
    </div>
  );
};
