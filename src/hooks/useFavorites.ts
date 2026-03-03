import { useState, useEffect, useCallback } from 'react';
import { favoritesStorage } from '@/utils/favoritesStorage';

interface UseFavoritesReturn {
  favoriteIds: number[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => Promise<void>;
  refetch: () => Promise<void>;
  isLoading: boolean;
}

export function useFavorites(): UseFavoritesReturn {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refetch = useCallback(async () => {
    const ids = await favoritesStorage.getFavoriteIds();
    setFavoriteIds(ids);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const isFavorite = useCallback(
    (id: number) => favoriteIds.includes(id),
    [favoriteIds]
  );

  const toggleFavorite = useCallback(async (id: number) => {
    const { ids } = await favoritesStorage.toggleFavorite(id);
    setFavoriteIds(ids);
  }, []);

  return { favoriteIds, isFavorite, toggleFavorite, refetch, isLoading };
}
