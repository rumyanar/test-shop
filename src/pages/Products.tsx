import { usePageTitle } from "../lib.ts";
import { useRef, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faStar } from "@fortawesome/free-solid-svg-icons";
import {
  ProductSort,
  SortField,
  SortOrder,
  useProducts,
} from "../hooks/useProducts.ts";
import { Alert } from "../components/Alert.tsx";
import { Pager } from "../components/Pager.tsx";
import { useDebounce } from "react-use";
import { AnimatePresence, motion } from "framer-motion";

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

export const Products = () => {
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

  // Temporary filter inputs (before applying)
  const [searchInput, setSearchInput] = useState(searchParams.search || "");
  const [minPriceInput, setMinPriceInput] = useState(
    searchParams.minPrice?.toString() || "",
  );
  const [maxPriceInput, setMaxPriceInput] = useState(
    searchParams.maxPrice?.toString() || "",
  );

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

  // Apply filters with debouncing
  useDebounce(
    () => {
      return navigate({
        search: {
          ...searchParams,
          page: undefined,
          search: searchInput || undefined,
          minPrice: minPriceInput || undefined,
          maxPrice: maxPriceInput || undefined,
          inStock:
            searchParams.inStock !== undefined
              ? searchParams.inStock
              : undefined,
        },
      });
    },
    500,
    [searchInput, minPriceInput, maxPriceInput],
  );

  // Clear filters
  const clearFilters = () => {
    setSearchInput("");
    setMinPriceInput("");
    setMaxPriceInput("");
    return navigate({
      search: { sortField: sort.field, sortOrder: sort.order },
    });
  };

  // Handle stock filter change
  const handleStockFilterChange = (value: boolean | null) => {
    return navigate({
      search: {
        ...searchParams,
        inStock: value !== null ? value : undefined,
        page: undefined,
      },
    });
  };

  // Handle sort change
  const handleSortChange = (field: SortField, order: SortOrder) =>
    navigate({
      search: { ...searchParams, sortField: field, sortOrder: order },
    });

  // Handle page change
  const handlePageChange = (newPage: number) => {
    // Scroll to top of the list
    window.scrollTo({
      top: containerRef.current?.offsetTop,
      behavior: "smooth",
    });
    return navigate({ search: { ...searchParams, page: newPage } });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Filters Section */}
      <div className="card bg-base-100 shadow-md mb-6">
        <div className="card-body">
          <h2 className="card-title">
            <FontAwesomeIcon icon={faFilter} className="mr-2" />
            Filters
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Search Products</span>
              </label>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Search by name..."
                  className="input input-bordered w-full"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
            </div>

            {/* Min Price */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Min Price</span>
              </label>
              <input
                type="number"
                placeholder="0"
                className="input input-bordered w-full"
                value={minPriceInput}
                onChange={(e) => setMinPriceInput(e.target.value)}
                min="0"
                step="0.01"
              />
            </div>

            {/* Max Price */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Max Price</span>
              </label>
              <input
                type="number"
                placeholder="1000"
                className="input input-bordered w-full"
                value={maxPriceInput}
                onChange={(e) => setMaxPriceInput(e.target.value)}
                min="0"
                step="0.01"
              />
            </div>

            {/* Stock Status */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Availability</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={
                  searchParams.inStock !== undefined
                    ? searchParams.inStock.toString()
                    : "all"
                }
                onChange={(e) => {
                  const value = e.target.value;
                  return handleStockFilterChange(
                    value === "all" ? null : value === "true",
                  );
                }}
              >
                <option value="all">All Products</option>
                <option value="true">In Stock</option>
                <option value="false">Out of Stock</option>
              </select>
            </div>
          </div>

          <div className="card-actions justify-end mt-4">
            <button className="btn btn-outline" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        </div>
      </div>

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
                    <figure className="px-4 pt-4 h-64 bg-white dark:bg-gray-700">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-full object-contain"
                      />
                    </figure>
                    <div className="card-body">
                      <div className="badge badge-secondary mb-2">
                        {product.category}
                      </div>
                      <h3 className="card-title text-base line-clamp-2">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {product.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center">
                          <FontAwesomeIcon
                            icon={faStar}
                            className="text-yellow-500 mr-1"
                          />
                          <span className="text-sm">
                            {product.rating.rate.toFixed(1)}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          ({product.rating.count} reviews)
                        </span>
                      </div>
                      <div className="card-actions justify-between items-center mt-4">
                        <div className="text-2xl font-bold text-primary">
                          ${product.price.toFixed(2)}
                        </div>
                        <div>
                          {(product as typeof product & { inStock: boolean })
                            .inStock ? (
                            <span className="badge badge-success">
                              In Stock
                            </span>
                          ) : (
                            <span className="badge badge-error">
                              Out of Stock
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
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
