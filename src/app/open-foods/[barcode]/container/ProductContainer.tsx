"use client";
import Image from "next/image";
import { ProductDataType } from "@openfoodfacts/openfoodfacts-nodejs";
import { useRouter } from "next/navigation";

type ProductPageProps = {
  product: ProductDataType | undefined;
};

const nutriscoreColors: Record<string, string> = {
  a: "bg-green-500",
  b: "bg-lime-400",
  c: "bg-yellow-400",
  d: "bg-orange-400",
  e: "bg-red-500",
};

const nutriscoreLabels: Record<string, string> = {
  a: "Muy bueno",
  b: "Bueno",
  c: "Regular",
  d: "Malo",
  e: "Muy malo",
};

export default function ProductContainer({ product }: ProductPageProps) {
  const router = useRouter();

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center gap-4 p-6">
        <div className="text-6xl">🔍</div>
        <h1 className="text-2xl font-bold text-gray-800">Producto no encontrado</h1>
        <p className="text-gray-500 text-center">No encontramos información para este código de barras.</p>
        <button
          className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-full shadow transition-colors"
          onClick={() => router.back()}
        >
          Escanear otro producto
        </button>
      </div>
    );
  }

  const grade = product?.nutriscore_grade?.toLowerCase() ?? "";
  const gradeColor = nutriscoreColors[grade] ?? "bg-gray-400";
  const gradeLabel = nutriscoreLabels[grade] ?? "";
  const calories = product?.nutriments?.["energy-kcal_100g"];
  const fat = product?.nutriments?.fat_100g;

  return (
    <div className="min-h-screen bg-gray-50">
      {product?.image_front_url && (
        <div className="relative w-full h-64 bg-white">
          <Image
            src={product.image_front_url}
            alt={product?.product_name ?? "Producto"}
            fill
            className="object-contain"
          />
        </div>
      )}

      <div className="px-5 py-6 flex flex-col gap-5">
        <div>
          <p className="text-xs font-semibold text-red-600 uppercase tracking-widest">{product?.brands}</p>
          <h1 className="text-2xl font-bold text-gray-900 mt-1 leading-tight uppercase">
            {product?.product_name}
          </h1>
        </div>

        {grade && (
          <div className={`${gradeColor} rounded-2xl px-5 py-4 flex items-center justify-between shadow`}>
            <div>
              <p className="text-white text-xs font-semibold uppercase tracking-wider">NutriScore</p>
              <p className="text-white text-sm mt-0.5">{gradeLabel}</p>
            </div>
            <span className="text-white text-5xl font-black">{grade.toUpperCase()}</span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          {calories != null && (
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col items-center">
              <span className="text-3xl">🔥</span>
              <p className="text-2xl font-bold text-gray-900 mt-1">{calories}</p>
              <p className="text-xs text-gray-500 mt-0.5">kcal / 100g</p>
            </div>
          )}
          {fat != null && (
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col items-center">
              <span className="text-3xl">🫧</span>
              <p className="text-2xl font-bold text-gray-900 mt-1">{fat}g</p>
              <p className="text-xs text-gray-500 mt-0.5">Grasas / 100g</p>
            </div>
          )}
        </div>

        <button
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-full shadow transition-colors"
          onClick={() => router.back()}
        >
          Escanear otro producto
        </button>
      </div>
    </div>
  );
}
