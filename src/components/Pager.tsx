import { useSearch } from "@tanstack/react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { ProductSearch } from "../pages/Products.tsx";

export interface PaginationProps {
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pager = ({ totalPages, onPageChange }: PaginationProps) => {
  // Get the current page from search params with strict: false to work across all routes
  const searchParams: Pick<ProductSearch, "page"> = useSearch({
    strict: false,
  });
  const page = searchParams.page || 1;

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center items-center gap-2">
      <button
        className="btn btn-outline"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
        Previous
      </button>

      <div className="flex gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
          // Show first page, last page, current page, and pages around current
          if (
            pageNum === 1 ||
            pageNum === totalPages ||
            (pageNum >= page - 1 && pageNum <= page + 1)
          ) {
            return (
              <button
                key={pageNum}
                className={`btn ${pageNum === page ? "btn-primary" : "btn-outline"}`}
                onClick={() => onPageChange(pageNum)}
              >
                {pageNum}
              </button>
            );
          } else if (pageNum === page - 2 || pageNum === page + 2) {
            return (
              <span key={pageNum} className="px-2 py-2">
                ...
              </span>
            );
          }
          return null;
        })}
      </div>

      <button
        className="btn btn-outline"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};
