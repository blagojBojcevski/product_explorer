import { useState, useEffect } from 'react';
import { productApi } from '@/api';
import type { Product } from '@/types';

interface UseProductDetailReturn {
  product: Product | null;
  isLoading: boolean;
  error: string | null;
  retry: () => void;
}

export function useProductDetail(productId: number): UseProductDetailReturn {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await productApi.getProductById(productId);
      setProduct(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to load product details.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  return {
    product,
    isLoading,
    error,
    retry: fetchProduct,
  };
}
