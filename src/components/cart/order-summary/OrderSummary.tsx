import React from "react";

interface OrderSummaryProps {
  subtotal: number;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ subtotal }) => {
  return (
    <div className="w-full md:w-[100%] p-4 border rounded-lg shadow-md bg-white mt-4 md:mt-0 mx-auto">
      <h3 className="text-lg font-bold mb-4">Order Summary</h3>
      <div className="flex justify-between mb-2">
        <span>Shipping</span>
        <span>Free</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Sales Tax</span>
        <span>Calculated at checkout</span>
      </div>
      <div className="flex justify-between mb-4">
        <span>Subtotal</span>
        <span className="font-bold">${subtotal.toFixed(2)}</span>
      </div>
      <button className="w-full bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700">
        Checkout
      </button>
    </div>
  );
};
