"use server";

import { productApi } from "@/lib/http";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  const { productId } = params;
  const response = await productApi.get(`products/${productId}`);

  return NextResponse.json(response?.data);
}
