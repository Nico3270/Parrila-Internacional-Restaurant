"use client";

import React, { useEffect, useState } from "react";
import { CartProductCard } from "@/components";
import { useCartStore } from "@/store";
import { CartProduct } from "@/interfaces";
import { getProductById } from "@/actions";



export const ProductsInCart: React.FC = () => {
  const cartItems = useCartStore((state) => state.cart);  // Productos del estado global
  const [formattedCartItems, setFormattedCartItems] = useState<CartProduct[]>([]);  // Productos con los datos completos

  console.log({formattedCartItems});

  useEffect(() => {
    const fetchProductData = async () => {
      const updatedCartItems = await Promise.all(
        cartItems.map(async (item) => {
          const productFromDb = await getProductById(item.id);  // Llamada directa a la server action

          // Si el producto existe, formateamos los datos
          if (productFromDb) {
            return {
              ...item,
              opcionesDisponibles: productFromDb.customizationOptions?.extras.map(extraRelation => ({
                name: extraRelation.extra.name,
                price: extraRelation.extra.price
              })) || [],
            };
          }

          return item;
        })
      );

      setFormattedCartItems(updatedCartItems);  // Actualizamos el estado con los productos formateados
    };

    fetchProductData();
  }, [cartItems]);

  return (
    <div className="grid grid-cols-1 gap-6"> {/* Usamos solo una columna */}
    {formattedCartItems.map((item, index) => (
      <CartProductCard key={index} product={item} />
    ))}
  </div>
  );
};
