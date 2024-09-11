/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import React, { ReactElement, useState } from "react";
import Image from "next/image";
import { Modal } from "./Modal";

type TCustomTable = {
  columns: any[];
  rows: any[];
  renderCustomAction?: (payload: any) => ReactElement;
};
export const objectLiterate = (val: any, cols: any[]) => {
  const mapKeys = Object.keys(val);
  return cols.map((col) => {
    if (mapKeys.includes(col.value)) {
      return col.value;
    }
  });
};

const renderColumn = (col: string, item: any) => {
  if (col === "thumbnail") {
    return <Image src={item[col]} width={200} height={200} alt="" />;
  }
  if (col === "price") {
    return <label>₱{item[col]}</label>;
  }
  return <label>{item[col]}</label>;
};

export function CustomTable({ columns, rows }: TCustomTable) {
  const [selectedProductId, setSelectedProductId] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const handleSelect = (productId: number) => {
    setSelectedProductId(productId);
    setIsVisible(true);
  };

  return (
    <>
      <Table className="border border-grey">
        <TableHeader className="bg-gray-200">
          <TableRow>
            {columns.map((col, idx) => (
              <TableHead key={idx}>
                <label className="font-medium text-black">{col.label}</label>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows?.map((item: any, key) => {
            const getCols = objectLiterate(item, columns);
            return (
              <TableRow key={key} onClick={() => handleSelect(item.id)}>
                {getCols.map((col, idx) => (
                  <TableCell key={idx}>{renderColumn(col, item)}</TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Modal
        productId={selectedProductId}
        isVisible={isVisible}
        onClose={() => setIsVisible(!isVisible)}
      />
    </>
  );
}
