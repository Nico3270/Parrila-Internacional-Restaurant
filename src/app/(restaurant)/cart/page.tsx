// src/app/cart/page.tsx


import { ProductsInCart, OrderSummaryWithActions, fetchProductsForCartFromDB } from "@/components";

export default async function CartPage() {
  // Obtenemos todos los productos y sus opciones de personalización desde la base de datos
  const productsPersonalization = await fetchProductsForCartFromDB();

  return (
    <div className="container mx-auto p-4">
  <h1 className="text-3xl font-bold mb-6">Tu Carrito</h1>

  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    {/* Columna principal para los productos (más ancha en pantallas grandes) */}
    <div className="lg:col-span-2">
      <ProductsInCart productsPersonalization={productsPersonalization} />
    </div>

    {/* Columna secundaria para el resumen de la orden con sticky */}
    <div className="bg-white p-4 shadow-md rounded-lg lg:sticky lg:top-24">
      <OrderSummaryWithActions />
    </div>
  </div>
</div>
  );
}
