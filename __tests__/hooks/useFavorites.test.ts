import { renderHook, act, waitFor } from '@testing-library/react-native';
import { useFavorites } from '../../src/hooks/useFavorites';

// favoritesStorage is mocked via AsyncStorage mock in jest.setup.js
jest.mock('../../src/utils/favoritesStorage', () => {
  let store: number[] = [];
  return {
    favoritesStorage: {
      getFavoriteIds: jest.fn(async () => [...store]),
      saveFavoriteIds: jest.fn(async (ids: number[]) => { store = ids; }),
      toggleFavorite: jest.fn(async (id: number) => {
        const index = store.indexOf(id);
        const isFavorite = index === -1;
        if (isFavorite) {
          store = [...store, id];
        } else {
          store = store.filter(i => i !== id);
        }
        return { ids: [...store], isFavorite };
      }),
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      // reset helper for tests
      _reset: () => { store = []; },
    },
  };
});

import { favoritesStorage } from '../../src/utils/favoritesStorage';

const mockStorage = favoritesStorage as typeof favoritesStorage & { _reset: () => void };

describe('useFavorites', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockStorage._reset();
  });

  it('loads favorites on mount', async () => {
    const { result } = renderHook(() => useFavorites());
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(favoritesStorage.getFavoriteIds).toHaveBeenCalledTimes(1);
  });

  it('returns false for isFavorite when product is not in favorites', async () => {
    const { result } = renderHook(() => useFavorites());
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.isFavorite(42)).toBe(false);
  });

  it('adds a product to favorites when toggled', async () => {
    const { result } = renderHook(() => useFavorites());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      await result.current.toggleFavorite(1);
    });

    expect(result.current.isFavorite(1)).toBe(true);
    expect(result.current.favoriteIds).toContain(1);
  });

  it('removes a product from favorites when toggled twice', async () => {
    const { result } = renderHook(() => useFavorites());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      await result.current.toggleFavorite(5);
    });

    expect(result.current.isFavorite(5)).toBe(true);

    await act(async () => {
      await result.current.toggleFavorite(5);
    });

    expect(result.current.isFavorite(5)).toBe(false);
  });

  it('persists multiple favorites independently', async () => {
    const { result } = renderHook(() => useFavorites());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      await result.current.toggleFavorite(1);
      await result.current.toggleFavorite(2);
      await result.current.toggleFavorite(3);
    });

    expect(result.current.isFavorite(1)).toBe(true);
    expect(result.current.isFavorite(2)).toBe(true);
    expect(result.current.isFavorite(3)).toBe(true);
    expect(result.current.isFavorite(4)).toBe(false);
  });
});
