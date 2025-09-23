"use client";
import Image from "next/image";
import { ProductDataType } from "@openfoodfacts/openfoodfacts-nodejs";
import { useRouter } from "next/navigation";

type ProductPageProps = {
  product: ProductDataType | undefined;
};

export default function ProductContainer({ product }: ProductPageProps) {
  const router = useRouter();

  if (!product) {
    return (
      <div className="p-6 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold uppercase">Producto no encontrado</h1>
        <button
          className="bg-white text-black font-bold py-2 px-4 rounded mt-6"
          onClick={() => router.back()}
        >
          Escanear otro producto
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col justify-center items-center">
      <button
        className="bg-white text-black font-bold py-2 px-4 rounded mb-6"
        onClick={() => router.back()}
      >
        Escanear otro producto
      </button>
      <h1 className="text-2xl font-bold uppercase">{product?.product_name}</h1>
      <p>
        <strong>Marca:</strong> {product?.brands}
      </p>
      <p>
        <strong>NutriScore:</strong> {product?.nutriscore_grade?.toUpperCase()}
      </p>
      <p>
        <strong>Calorías:</strong> {product?.nutriments?.["energy-kcal_100g"]}{" "}
        kcal / 100g
      </p>
      <p>
        <strong>Grasas:</strong> {product?.nutriments?.fat_100g} g
      </p>

      {product?.image_front_url && (
        <Image
          src={product?.image_front_url}
          alt={product?.product_name}
          className="rounded-lg shadow mt-4"
          width={300}
          height={300}
        />
      )}
    </div>
  );
}
