"use server";

import { productApi } from "@/lib/http";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const skip = searchParams.get("skip");
  const response = await productApi.get("products", {
    params: {
      limit: 10,
      skip,
    },
  });

  return NextResponse.json(response?.data);
}
