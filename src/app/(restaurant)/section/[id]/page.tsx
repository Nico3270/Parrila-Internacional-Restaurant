import { PageNotFound, ProductGrid } from "@/components";
import { initialData } from "@/interfaces/seed";
import { idSecciones } from "@/utils";

interface Props {
  params: {
    id: string
  }
}

const seedProducts = initialData.products;

export default function Home({params}: Props) {
  const {id} = params;
  const idSection = idSecciones(id);
  if (idSection === "Not found") {
    return (
      <PageNotFound />
    )
  };
  const products = seedProducts.filter(product => (product.seccion === idSection));
  
  return (
    <div>
      <ProductGrid products={products} />
    </div>
  );
}
