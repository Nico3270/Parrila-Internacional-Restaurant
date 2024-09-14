"use client";

import { titleFont } from '@/config/fonts';
import { useState } from 'react';

interface QuantitySelectorProps {
  inicio: number;
  onQuantityChange: (newQuantity: number) => void; // Añadimos el callback
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({ inicio, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(inicio);

  const handleQuantityChange = (newQuantity: number) => {
    const updatedQuantity = Math.max(1, newQuantity); // Evitar cantidades menores que 1
    setQuantity(updatedQuantity);
    onQuantityChange(updatedQuantity); // Llamamos al callback para notificar el cambio
  };

  return (
    <div className="mt-4">
      <div className="flex items-center space-x-4">
        <label htmlFor="quantity" className={`text-md  ${titleFont.className} font-bold`}>
          Cantidad
        </label>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            className="px-3 py-1 bg-red-500 rounded-l-lg text-lg text-white hover:bg-gray-300 hover:text-black transition"
          >
            -
          </button>
          <input
            id="quantity"
            type="text"
            readOnly
            value={quantity}
            className="w-20 border border-gray-600 rounded-lg text-center"
          />
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            className="px-3 py-1 bg-red-500 rounded-r-lg text-lg text-white hover:bg-gray-300 hover:text-black transition"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
