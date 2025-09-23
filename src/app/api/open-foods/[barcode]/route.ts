import { NextRequest, NextResponse } from "next/server";
import { OpenFoodFacts } from "@openfoodfacts/openfoodfacts-nodejs";

const client = new OpenFoodFacts(globalThis.fetch);

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ barcode: string }> }
) {
  const { barcode } = await params;

  if (!barcode || isNaN(+barcode)) {
    return NextResponse.json({ message: "Invalid barcode" }, { status: 400 });
  }

  const productResponse = await client.getProductV3(barcode);

  console.log("productResponse: ", productResponse);

  if (!productResponse.data) {
    return NextResponse.json(
      { error: `Producto con código ${barcode} no encontrado` },
      { status: 404 }
    );
  }

  if (productResponse.data?.status == "failure") {
    return NextResponse.json(
      { error: `Producto con código ${barcode} no encontrado` },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { productResponse },
    { status: 200 }
  );
}
