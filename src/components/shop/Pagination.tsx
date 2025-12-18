"use client";

import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxVisiblePages = 5;

  const getPageNumbers = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) {
      start = 2;
      end = 4;
    } else if (currentPage >= totalPages - 2) {
      start = totalPages - 3;
      end = totalPages - 1;
    }

    const pages = [1];

    if (start > 2) {
      pages.push(-1); // ellipsis
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push(-1); // ellipsis
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-zinc-900/60 border-zinc-700 text-white hover:bg-zinc-800 hover:border-zinc-600 disabled:bg-zinc-900/30 disabled:text-zinc-600 disabled:border-zinc-800"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {pages.map((page, index) =>
        page === -1 ? (
          <span key={`ellipsis-${index}`} className="px-3 py-2 text-zinc-500">
            ...
          </span>
        ) : (
          <Button
            key={page}
            variant="outline"
            size="icon"
            onClick={() => onPageChange(page)}
            className={`min-w-[40px] ${
              currentPage === page
                ? "bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600"
                : "bg-zinc-900/60 border-zinc-700 text-white hover:bg-zinc-800 hover:border-zinc-600"
            }`}
          >
            {page}
          </Button>
        )
      )}

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-zinc-900/60 border-zinc-700 text-white hover:bg-zinc-800 hover:border-zinc-600 disabled:bg-zinc-900/30 disabled:text-zinc-600 disabled:border-zinc-800"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
