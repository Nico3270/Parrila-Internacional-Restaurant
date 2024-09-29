// src/actions/getCartProducts.ts
import prisma from "@/lib/prisma";

// Server Action para obtener todos los productos y sus opciones de personalización
export async function fetchProductsForCartFromDB() {
  // Buscamos todos los productos en la base de datos, incluyendo sus opciones de personalización
  const productsFromDB = await prisma.product.findMany({
    include: {
      customizationOptions: {
        include: {
          extras: {
            include: {
              extra: true,  // Incluimos las opciones extras de personalización
            },
          },
        },
      },
    },
  });

  // Creamos un array con el id del producto y las opciones de personalización disponibles
  const productsPersonalization = productsFromDB.map((product) => ({
    id: product.id,
    opcionesDisponibles: product.customizationOptions?.extras.map(extraRelation => ({
      name: extraRelation.extra.name,
      price: extraRelation.extra.price,
    })) || [],  // Agregamos las opciones de personalización si existen
  }));

  return productsPersonalization;
}
