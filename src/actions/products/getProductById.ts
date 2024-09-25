// src/lib/product-actions.ts
import prisma from "@/lib/prisma";

// Server action para obtener un producto por su id
export async function getProductById(productId: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { customizationOptions: { include: { extras: { include: { extra: true } } } } },
    });

    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}
