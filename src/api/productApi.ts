import { API_BASE_URL } from '@/constants';
import type { Product, ProductsResponse } from '@/types';

class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(endpoint: string): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new ApiError(
      `Request failed: ${response.statusText}`,
      response.status
    );
  }

  const data = await response.json();
  return data as T;
}

export const productApi = {
  getProducts: (limit = 100, skip = 0): Promise<ProductsResponse> =>
    request<ProductsResponse>(`/products?limit=${limit}&skip=${skip}`),

  getProductById: (id: number): Promise<Product> =>
    request<Product>(`/products/${id}`),

  getCategories: (): Promise<string[]> =>
    request<{ slug: string; name: string; url: string }[]>('/products/categories').then(cats =>
      cats.map(c => c.slug)
    ),
};

export { ApiError };
