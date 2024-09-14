export interface Product {
    id?: string;  // Identificador único del producto
    titulo: string;  // Título del producto
    description: string;  // Descripción detallada del producto
    shortDescription?: string;  // Descripción corta opcional
    images: string[];  // URLs de las imágenes del producto (relación con Cloudinary o similar)
    available: boolean;  // Disponibilidad del producto
    precio: number;  // Precio del producto
    discountPrice?: number;  // Precio con descuento opcional
    slug: string;  // URL amigable para SEO
    tags: string[];  // Etiquetas para filtrar productos (e.g., vegano, sin gluten, etc.)
    seccion: "Platos fuertes" | "Entradas" | "Hamburguesas" | "Perros calientes" | "Cervezas" | "Bebidas calientes" | "Cocteles" | "Pizza";  // Sección del menú a la que pertenece
    priority?: number;  // Prioridad para paginación o promociones
    featured?: boolean;  // Producto destacado o promocionado
    isAvailableDuring?: { start: string; end: string };  // Horario o fecha de disponibilidad del producto (opcional)
    createdAt?: Date;  // Fecha de creación
    updatedAt?: Date;  // Fecha de la última modificación
    ingredients?: string[];  // Lista de ingredientes (opcional)
    nutritionalInfo?: { calories: number; protein: number; fat: number; carbohydrates: number };  // Información nutricional opcional
    relatedProducts?: string[];  // IDs de productos relacionados (para recomendaciones)
    tipo: "Comida" | "Entrada" | "Bebidas" | "Postres";
    reviews?: Review [];
    customizationOptions?: {
        extras: { name: string; price: number }[];  // Ingredientes o opciones adicionales con precios
        choices: {
          name: string;  // Opción de personalización (e.g., "Salsa", "Punto de cocción")
          values: string[];  // Valores disponibles (e.g., "Poco hecho", "Bien hecho")
        }[];
};}

export interface Review {
    username: string;
    comment: string;
    rating: number;
    date: string;
}