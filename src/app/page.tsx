"use client";
import { Spinner } from "@/assets/icons/Spinner";
import { CustomTable } from "@/components/CustomTable";
import { Pagination } from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetProducts } from "@/services/products";
import { useState } from "react";

export default function Home() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const { data, isLoading } = useGetProducts(page!, search);

  const listConfig = {
    columns: [
      {
        label: "Thumbnail",
        value: "thumbnail",
      },
      {
        label: "Name",
        value: "title",
      },
      {
        label: "Price",
        value: "price",
      },
    ],
    rows: data?.products,
  };

  const totalPagination = data?.limit + data?.skip;
  const remainingProducts = data?.total - totalPagination;

  return (
    <div className="flex justify-center">
      <div className="w-3/4 space-y-8">
        <div className="bg-blue-500 flex justify-center items-center h-10 ">
          <h1 className="text-white">PRODUCTS DEMO</h1>
        </div>
        <div className="relative w-full">
          <Input
            placeholder="Search product"
            value={search ?? ""}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
            onClick={() => {
              setSearch("");
            }}
          >
            X<span className="sr-only">Clear</span>
          </Button>
        </div>
        {isLoading ? (
          search === "" ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          ) : (
            <h1>Searching ...</h1>
          )
        ) : data?.products.length === 0 && search !== "" ? (
          <h1>No products matched your search keyword</h1>
        ) : (
          <CustomTable {...listConfig} />
        )}
        <Pagination
          data={data}
          setPage={setPage}
          page={page}
          remainingProducts={remainingProducts}
        />
      </div>
    </div>
  );
}
