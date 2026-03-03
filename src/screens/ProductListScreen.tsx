import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  RefreshControl,
  ListRenderItemInfo,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList, Product } from '@/types';
import { COLORS, SPACING, FONT_SIZE } from '@/constants';
import { useProducts, useFavorites } from '@/hooks';
import { ProductCard } from '@/components/product';
import {
  LoadingSpinner,
  ErrorView,
  CategoryFilter,
} from '@/components/common';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductList'>;

export function ProductListScreen({ navigation }: Props) {
  const {
    filteredProducts,
    categories,
    selectedCategory,
    isLoading,
    isRefreshing,
    error,
    setSelectedCategory,
    refresh,
    retry,
  } = useProducts();

  const { isFavorite, toggleFavorite, refetch: refetchFavorites } = useFavorites();

  useFocusEffect(
    useCallback(() => {
      refetchFavorites();
    }, [refetchFavorites])
  );

  const handleProductPress = useCallback(
    (productId: number) => {
      navigation.navigate('ProductDetail', { productId });
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Product>) => (
      <ProductCard
        product={item}
        isFavorite={isFavorite(item.id)}
        onPress={() => handleProductPress(item.id)}
        onFavoriteToggle={() => toggleFavorite(item.id)}
      />
    ),
    [isFavorite, handleProductPress, toggleFavorite]
  );

  const keyExtractor = useCallback((item: Product) => item.id.toString(), []);

  if (isLoading) {
    return <LoadingSpinner fullScreen message="Loading products…" />;
  }

  if (error) {
    return <ErrorView message={error} onRetry={retry} />;
  }

  return (
    <View style={styles.container}>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refresh}
            tintColor={COLORS.primary}
            colors={[COLORS.primary]}
          />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyTitle}>No products found</Text>
            <Text style={styles.emptySubtitle}>
              {selectedCategory
                ? 'Try selecting a different category'
                : 'Pull down to refresh'}
            </Text>
          </View>
        }
        testID="product-list"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  list: {
    padding: SPACING.sm,
    paddingBottom: SPACING.xl,
  },
  row: {
    justifyContent: 'space-between',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: SPACING.xxl,
    gap: SPACING.sm,
  },
  emptyIcon: {
    fontSize: 48,
  },
  emptyTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    color: COLORS.text,
  },
  emptySubtitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});
