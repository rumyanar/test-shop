import { useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useDebounce } from "react-use";
import { ProductSearch } from "../pages/ProductsList.tsx";

export const ProductFilters = () => {
  // Get URL search params
  const searchParams: ProductSearch = useSearch({ from: "/products" });

  const navigate = useNavigate({ from: "/products" });

  // Temporary filter inputs (before applying)
  const [searchInput, setSearchInput] = useState(searchParams.search || "");
  const [minPriceInput, setMinPriceInput] = useState(
    searchParams.minPrice?.toString() || "",
  );
  const [maxPriceInput, setMaxPriceInput] = useState(
    searchParams.maxPrice?.toString() || "",
  );

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
      search: {
        sortField: searchParams.sortField,
        sortOrder: searchParams.sortOrder,
      },
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

  return (
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
  );
};
