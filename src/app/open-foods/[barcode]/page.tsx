import ProductContainer from "./container/ProductContainer";
import { ProductDataType } from "@openfoodfacts/openfoodfacts-nodejs";

type ProductPageProps = {
  params: { barcode: string };
};

let product: ProductDataType | undefined;

let apiURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default async function ProductPage({ params }: ProductPageProps) {
  const productResponse = await fetch(
    `${apiURL}/api/open-foods/${params.barcode}`,
    {
      cache: "no-store",
    }
  );

  const productJson = await productResponse.json();

  if (!productJson.error) {
    product = productJson.productResponse.data.product;
  }

  return <ProductContainer product={product} />;
}
