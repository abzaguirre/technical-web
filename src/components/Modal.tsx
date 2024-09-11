/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetProductInformation } from "@/services/products";
import Image from "next/image";

export const Modal = ({
  productId,
  isVisible,
  onClose,
}: {
  productId: number;
  onClose: () => void;
  isVisible: boolean;
}) => {
  const { data } = useGetProductInformation(productId);

  return (
    <Dialog open={isVisible}>
      <DialogContent
        onClose={onClose}
        className="w-3/4 bg-white gap-y-4 overflow-auto h-3/4"
      >
        <DialogDescription>{data?.category.toUpperCase()}</DialogDescription>
        <DialogTitle className="text-2xl">{data?.title}</DialogTitle>
        <DialogDescription>{data?.description}</DialogDescription>
        <DialogTitle className="text-md">₱{data?.price}</DialogTitle>
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-sm font-semibold">MORE IMAGES</h2>
          <div className="flex flex-wrap">
            {data?.images.map((img: any) => (
              <Image src={img} width={200} height={200} alt="" />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
