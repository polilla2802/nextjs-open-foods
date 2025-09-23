"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

type ProductPageProps = {
  params: { barcode: string };
};

export default async function ProductPage({ params }: ProductPageProps) {
  const router = useRouter();

  const productResponse = await fetch(`/api/open-foods/${params.barcode}`, {
    cache: "no-store",
  });

  const productJson = await productResponse.json();

  const product = productJson.productResponse.data.product;

  console.log(product);

  if (product.error) {
    return <p>Error: {product.error.message}</p>;
  }

  return (
    <div className="p-6 flex flex-col justify-center items-center">
      <button
        className="bg-white text-black font-bold py-2 px-4 rounded mb-6"
        onClick={() => router.back()}
      >
        Escanear otro producto
      </button>
      <h1 className="text-2xl font-bold uppercase">{product.product_name}</h1>
      <p>
        <strong>Marca:</strong> {product.brands}
      </p>
      <p>
        <strong>NutriScore:</strong> {product.nutriscore_grade?.toUpperCase()}
      </p>
      <p>
        <strong>Calorías:</strong> {product.nutriments?.["energy-kcal_100g"]}{" "}
        kcal / 100g
      </p>
      <p>
        <strong>Grasas:</strong> {product.nutriments?.fat_100g} g
      </p>

      {product.image_front_url && (
        <Image
          src={product.image_front_url}
          alt={product.product_name}
          className="rounded-lg shadow mt-4"
          width={300}
          height={300}
        />
      )}
    </div>
  );
}
