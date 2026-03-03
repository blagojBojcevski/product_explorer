import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '@/constants';

export const favoritesStorage = {
  async getFavoriteIds(): Promise<number[]> {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (!stored) return [];
      return JSON.parse(stored) as number[];
    } catch {
      return [];
    }
  },

  async saveFavoriteIds(ids: number[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(ids));
    } catch {
      // Silently fail - favorites are non-critical
    }
  },

  async toggleFavorite(id: number): Promise<{ ids: number[]; isFavorite: boolean }> {
    const current = await this.getFavoriteIds();
    const isFavorite = current.includes(id);
    const updated = isFavorite
      ? current.filter(favId => favId !== id)
      : [...current, id];
    await this.saveFavoriteIds(updated);
    return { ids: updated, isFavorite: !isFavorite };
  },
};