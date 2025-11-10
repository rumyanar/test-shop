import { usePageTitle } from "../lib.ts";
import { useRef } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  ProductSort,
  SortField,
  SortOrder,
  useProducts,
} from "../hooks/useProducts.ts";
import { Alert } from "../components/Alert.tsx";
import { Pager } from "../components/Pager.tsx";
import { AnimatePresence, motion } from "framer-motion";
import { ProductFilters } from "../components/ProductFilters.tsx";
import { ProductItem } from "../components/ProductItem.tsx";

export interface ProductSearch {
  page?: number;
  limit?: number;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sortField?: string;
  sortOrder?: string;
}

export const ProductsList = () => {
  usePageTitle({ section: "Products" });
  const itemsPerPage = 12;
  const containerRef = useRef<HTMLDivElement>(null);

  // Get URL search params
  const searchParams: ProductSearch = useSearch({ from: "/products" });

  const navigate = useNavigate({ from: "/products" });

  // Parse URL params with defaults
  const page = searchParams.page || 1;

  // Sort state
  const sort: ProductSort = {
    field: (searchParams.sortField as SortField) || "title",
    order: (searchParams.sortOrder as SortOrder) || "asc",
  };

  // Fetch products using the custom hook
  const { products, loading, error, totalProducts, totalPages } = useProducts({
    page,
    limit: searchParams.limit || itemsPerPage,
    filters: {
      searchQuery: searchParams.search || "",
      minPrice: searchParams.minPrice || null,
      maxPrice: searchParams.maxPrice || null,
      inStock: searchParams.inStock !== undefined ? searchParams.inStock : null,
    },
    sort,
  });

  // Handle sort change
  const handleSortChange = (field: SortField, order: SortOrder) =>
    navigate({
      search: { ...searchParams, sortField: field, sortOrder: order },
    });

  // Handle page change
  const handlePageChange = (newPage: number) => {
    // Scroll to the top of the list
    window.scrollTo({
      top: containerRef.current?.offsetTop,
      behavior: "smooth",
    });
    return navigate({ search: { ...searchParams, page: newPage } });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Filters Section */}
      <ProductFilters />

      {/* Sort and Results Info */}
      <div className="flex flex-row justify-between items-start md:items-center mb-4 gap-4">
        <motion.div
          key={`results-${totalProducts}`}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="text-sm my-auto"
        >
          Showing {products.length} of {totalProducts} products
        </motion.div>

        <div className="flex gap-2 items-center">
          <span className="text-sm mr-2 text-nowrap">Sort by:</span>
          <select
            className="select select-bordered select-sm"
            value={`${sort.field}-${sort.order}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split("-") as [
                SortField,
                SortOrder,
              ];
              return handleSortChange(field, order);
            }}
          >
            <option value="title-asc">Name (A-Z)</option>
            <option value="title-desc">Name (Z-A)</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
          </select>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <Alert type="alert-error">
          <strong>Error:</strong> {error}
        </Alert>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {/* Products Grid */}
      {!loading && !error && (
        <>
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">
                No products found matching your criteria.
              </p>
            </div>
          ) : (
            <motion.div
              ref={containerRef}
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
              <AnimatePresence mode="popLayout">
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    whileHover={{ scale: 1.03, y: -5 }}
                    className="card bg-base-100 shadow-xl hover:shadow-2xl"
                  >
                    <ProductItem product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Pagination */}
          <Pager totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      )}
    </div>
  );
};
