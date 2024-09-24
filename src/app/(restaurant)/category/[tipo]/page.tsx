import { ProductGrid } from "@/components";
import { initialData } from "@/seed/seed";


interface Props {
    params: {
        tipo: string
    }
}


export default function CategoryPage({params}:Props) {
    const {tipo} = params;
    const productsTipo = initialData.products.filter(product => product.tipo === tipo)
  return (
    <div>
      <ProductGrid products={productsTipo} />
    </div>
  );
}