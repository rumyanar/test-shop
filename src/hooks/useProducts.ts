import { useEffect, useMemo, useState } from "react";

// Product interface for DummyJSON API
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
  rating: number;
  brand?: string;
  stock: number;
  inStock: boolean;
}

// DummyJSON API response type
interface DummyJSONResponse {
  products: Array<{
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    thumbnail: string;
    rating: number;
    brand?: string;
    stock: number;
  }>;
  total: number;
  skip: number;
  limit: number;
}

export interface ProductFilters {
  searchQuery: string;
  minPrice: number | null;
  maxPrice: number | null;
  inStock: boolean | null; // null = all, true = in stock, false = out of stock
  category: string | null; // null = all categories
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

// Category type from DummyJSON API
export interface Category {
  slug: string;
  name: string;
  url: string;
}

// Hook to get all unique categories
export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((response) => response.json())
      .then((data: Category[]) => {
        setCategories(data);
        setLoading(false);
      })
      .catch(() => {
        setCategories([]);
        setLoading(false);
      });
  }, []);

  return { categories, loading };
};

export const useProducts = ({
  page,
  limit,
  filters,
  sort,
}: UseProductsParams): UseProductsResult => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from DummyJSON API
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch("https://dummyjson.com/products?limit=0")
      .then((response) => response.json())
      .then((data: DummyJSONResponse) => {
        // Transform DummyJSON products to our Product format
        const products: Product[] = data.products.map((product) => ({
          ...product,
          inStock: product.stock > 5,
        }));

        setAllProducts(products);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "An error occurred");
        setLoading(false);
      });
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
        (product) => product.inStock === filters.inStock,
      );
    }

    if (filters.category !== null) {
      filtered = filtered.filter(
        (product) =>
          product.category.toLowerCase() === filters.category!.toLowerCase(),
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
