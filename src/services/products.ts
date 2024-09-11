import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const http = axios.create();

export function useGetProducts(page: number, search: string) {
  const skip = page;
  return useQuery({
    queryKey: ["getProducts", { skip, search }],
    queryFn: () => {
      if (Boolean(search))
        return http.get("/api/products/search", {
          params: { search, skip },
        });
      return http.get("/api/products", {
        params: { skip },
      });
    },
    select: (response) => response.data,
  });
}

export function useGetProductInformation(productId: number) {
  return useQuery({
    queryKey: ["getProductInformation", { productId }],
    queryFn: () => http.get(`/api/products/${productId}`),
    select: (response) => response.data,
  });
}
