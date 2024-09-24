import { CartProduct } from "@/interfaces";
import { create } from "zustand";

interface State {
  cart: CartProduct[];

  // Función para agregar producto al carrito
  addProductToCart: (product: CartProduct) => void;

  // Función para actualizar la cantidad de un producto
  updateProductQuantity: (id: string, quantity: number) => void;

  // Función para eliminar un producto del carrito
  removeProduct: (id: string) => void;
}

export const useCartStore = create<State>((set) => ({
    cart: [],
  
    // Método para agregar un producto al carrito
    addProductToCart: (product: CartProduct) =>
      set((state) => ({
        cart: [...state.cart, product],
      })),
  
    // Método para actualizar la cantidad de un producto en el carrito
    updateProductQuantity: (cartItemId: string, quantity: number) =>
      set((state) => ({
        cart: state.cart.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity } : item
        ),
      })),
  
    // Método para eliminar un producto del carrito
    removeProduct: (cartItemId: string) =>
      set((state) => ({
        cart: state.cart.filter((item) => item.cartItemId !== cartItemId),
      })),
  
    // Método para actualizar comentario y opciones de personalización
    updateProductDetails: (
      cartItemId: string,
      comentario?: string,
      opcionesPersonalizacion?: { name: string; price: number }[]
    ) =>
      set((state) => ({
        cart: state.cart.map((item) =>
          item.cartItemId === cartItemId
            ? {
                ...item,
                comentario: comentario !== undefined ? comentario : item.comentario,
                opcionesPersonalizacion:
                  opcionesPersonalizacion !== undefined
                    ? opcionesPersonalizacion
                    : item.opcionesPersonalizacion,
              }
            : item
        ),
      })),
  }));
  
