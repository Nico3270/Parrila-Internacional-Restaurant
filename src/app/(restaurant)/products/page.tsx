import { ProductGrid } from "@/components";
import { initialData } from "@/interfaces/seed";

const products = initialData.products;

export default function ProductsPage() {
  return (
    <div>
      <ProductGrid products={products}/>

    </div>
  );
}
