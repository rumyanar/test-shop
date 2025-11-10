import { useEffect, useMemo, useState } from "react";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductFilters {
  searchQuery: string;
  minPrice: number | null;
  maxPrice: number | null;
  inStock: boolean | null; // null = all, true = in stock, false = out of stock
}

export type SortField = "title" | "price";
export type SortOrder = "asc" | "desc";

export interface ProductSort {
  field: SortField;
  order: SortOrder;
}

export interface UseProductsParams {
  page: number;
  limit: number;
  filters: ProductFilters;
  sort: ProductSort;
}

export interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  totalProducts: number;
  totalPages: number;
}

export const useProducts = ({
  page,
  limit,
  filters,
  sort,
}: UseProductsParams): UseProductsResult => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();

        // Add a mock "inStock" property to each product
        // Since the API doesn't provide stock status, we'll simulate it
        const productsWithStock = data.map((product: Product) => ({
          ...product,
          inStock: product.id % 3 !== 0, // Mock: every 3rd product is out of stock
        }));

        setAllProducts(productsWithStock);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter, sort, and paginate products
  const { products, totalProducts, totalPages } = useMemo(() => {
    let filtered = [...allProducts];

    // Apply filters
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(query),
      );
    }

    if (filters.minPrice !== null) {
      filtered = filtered.filter(
        (product) => product.price >= filters.minPrice!,
      );
    }

    if (filters.maxPrice !== null) {
      filtered = filtered.filter(
        (product) => product.price <= filters.maxPrice!,
      );
    }

    if (filters.inStock !== null) {
      filtered = filtered.filter(
        (product) =>
          (product as Product & { inStock: boolean }).inStock ===
          filters.inStock,
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      if (sort.field === "title") {
        comparison = a.title.localeCompare(b.title);
      } else if (sort.field === "price") {
        comparison = a.price - b.price;
      }
      return sort.order === "asc" ? comparison : -comparison;
    });

    const total = filtered.length;
    const pages = Math.ceil(total / limit);

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginated = filtered.slice(startIndex, endIndex);

    return {
      products: paginated,
      totalProducts: total,
      totalPages: pages,
    };
  }, [allProducts, filters, sort, page, limit]);

  return {
    products,
    loading,
    error,
    totalProducts,
    totalPages,
  };
};
