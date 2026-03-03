import { useState, useEffect, useCallback } from 'react';
import { productApi } from '@/api';
import type { Product } from '@/types';

interface UseProductsReturn {
  products: Product[];
  filteredProducts: Product[];
  categories: string[];
  selectedCategory: string | null;
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  setSelectedCategory: (category: string | null) => void;
  refresh: () => Promise<void>;
  retry: () => void;
}

export function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }
      setError(null);

      const [productsResponse, categoriesResponse] = await Promise.all([
        productApi.getProducts(100),
        productApi.getCategories(),
      ]);

      setProducts(productsResponse.products);
      setCategories(categoriesResponse);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to load products. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refresh = useCallback(async () => {
    await fetchData(true);
  }, [fetchData]);

  const retry = useCallback(() => {
    fetchData();
  }, [fetchData]);

  const filteredProducts =
    selectedCategory == null
      ? products
      : products.filter(p => p.category === selectedCategory);

  return {
    products,
    filteredProducts,
    categories,
    selectedCategory,
    isLoading,
    isRefreshing,
    error,
    setSelectedCategory,
    refresh,
    retry,
  };
}
