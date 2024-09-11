/* eslint-disable @typescript-eslint/no-explicit-any */
import { PaginationChevDownIcon } from "@/assets/icons/PaginationChevDownIcon";
import { Button } from "./ui/button";
import { PaginationChevLeftIcon } from "@/assets/icons/PaginationChevLeftIcon";

export const Pagination = ({
  page,
  setPage,
  data,
  remainingProducts,
}: {
  page: any;
  setPage: any;
  data: any;
  remainingProducts: number;
}) => {
  const onNext = () => {
    setPage((prev: number) => prev + 10);
  };

  const onBack = () => {
    setPage((prev: number) => prev - 10);
  };
  return (
    <div className="flex items-center justify-end border-t border-[#E7E7E7]">
      <div className="flex gap-x-2 ml-3 py-5">
        <Button
          variant="ghost"
          className="hover:bg-transparent"
          onClick={onBack}
          disabled={page === 0}
        >
          <PaginationChevLeftIcon />
        </Button>
        <Button
          variant="ghost"
          className="hover:bg-transparent"
          onClick={onNext}
          disabled={remainingProducts <= 0}
        >
          <div className="rotate-180">
            <PaginationChevLeftIcon />
          </div>
        </Button>
      </div>
    </div>
  );
};
