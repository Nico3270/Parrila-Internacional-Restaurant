"use client"; // Esto convierte al componente en un cliente

import React, { useState } from "react";
import clsx from "clsx";
import { OrderSummary } from "../order-summary/OrderSummary";


export const OrderSummaryWithActions: React.FC = () => {
  const [deliveryOption, setDeliveryOption] = useState<string | null>(null);

  const handleOptionChange = (option: string) => {
    setDeliveryOption(option);
  };

  const handleContinue = () => {
    if (deliveryOption === "restaurant") {
      window.location.href = "/checkout";
    } else if (deliveryOption === "domicilio") {
      window.location.href = "/checkout/address";
    }
  };

  return (
    <div>
      <OrderSummary />

      {/* Checkboxes */}
      <div className="mt-4">
        <label className="block mb-2 font-semibold">¿Cómo prefieres recibir tu comida?</label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="deliveryOption"
              value="restaurant"
              onChange={() => handleOptionChange("restaurant")}
              checked={deliveryOption === "restaurant"}
              className="mr-2"
            />
            Comer en restaurante
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="deliveryOption"
              value="domicilio"
              onChange={() => handleOptionChange("domicilio")}
              checked={deliveryOption === "domicilio"}
              className="mr-2"
            />
            Pedir a domicilio
          </label>
        </div>
      </div>

      {/* Botón continuar */}
      <button
        className={clsx(
          "mt-6 w-full py-2 px-4 bg-blue-500 text-white rounded-lg",
          deliveryOption ? "hover:bg-blue-600 cursor-pointer" : "bg-gray-300 cursor-not-allowed"
        )}
        onClick={handleContinue}
        disabled={!deliveryOption}
      >
        Continuar con la orden
      </button>
    </div>
  );
};
