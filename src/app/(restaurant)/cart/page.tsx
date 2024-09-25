// src/app/cart/page.tsx (Componente del servidor)

import { OrderSummaryWithActions, ProductsInCart } from "@/components";



export default function CartPage() {
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Tu Carrito</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna principal para los productos (70% en pantallas grandes) */}
        <div className="lg:col-span-2">
          <ProductsInCart />
        </div>

        {/* Columna secundaria para el resumen de la orden (30% en pantallas grandes) */}
        <div className="bg-white p-4 shadow-md rounded-lg">
          <OrderSummaryWithActions />
        </div>
      </div>
    </div>
  );
}
