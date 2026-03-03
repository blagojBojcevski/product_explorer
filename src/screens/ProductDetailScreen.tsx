import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  ListRenderItemInfo,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/types';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from '@/constants';
import { useProductDetail, useFavorites } from '@/hooks';
import { LoadingSpinner, ErrorView, FavoriteButton, RatingStars } from '@/components/common';
import { formatPrice, titleCase, formatDiscount } from '@/utils/formatters';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export function ProductDetailScreen({ route }: Props) {
  const { productId } = route.params;
  const { product, isLoading, error, retry } = useProductDetail(productId);
  const { isFavorite, toggleFavorite } = useFavorites();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (isLoading) {
    return <LoadingSpinner fullScreen message="Loading product…" />;
  }

  if (error || !product) {
    return <ErrorView message={error ?? 'Product not found'} onRetry={retry} />;
  }

  const favorite = isFavorite(product.id);
  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      testID="product-detail-scroll"
    >
      {/* Image Gallery */}
      <View style={styles.imageGallery}>
        <FlatList
          data={product.images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          onMomentumScrollEnd={e => {
            const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
            setActiveImageIndex(index);
          }}
          renderItem={({ item }: ListRenderItemInfo<string>) => (
            <Image
              source={{ uri: item }}
              style={styles.image}
              resizeMode="cover"
              accessibilityLabel={product.title}
            />
          )}
        />
        {product.images.length > 1 ? (
          <View style={styles.dots}>
            {product.images.map((_, i) => (
              <View
                key={i}
                style={[styles.dot, i === activeImageIndex && styles.dotActive]}
              />
            ))}
          </View>
        ) : null}
      </View>

      {/* Product Info */}
      <View style={styles.infoContainer}>
        {/* Category & Brand */}
        <View style={styles.metaRow}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{titleCase(product.category)}</Text>
          </View>
          <Text style={styles.brand}>{product.brand}</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>{product.title}</Text>

        {/* Rating */}
        <RatingStars rating={product.rating} />

        {/* Price */}
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{formatPrice(discountedPrice)}</Text>
          {product.discountPercentage > 1 ? (
            <View style={styles.priceOriginalRow}>
              <Text style={styles.priceOriginal}>{formatPrice(product.price)}</Text>
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{formatDiscount(product.discountPercentage)}</Text>
              </View>
            </View>
          ) : null}
        </View>

        {/* Stock */}
        <View style={[styles.stockBadge, product.stock < 10 && styles.stockBadgeLow]}>
          <Text style={[styles.stockText, product.stock < 10 && styles.stockTextLow]}>
            {product.stock > 0
              ? product.stock < 10
                ? `⚠️ Only ${product.stock} in stock`
                : `✓ In Stock (${product.stock} available)`
              : '✗ Out of Stock'}
          </Text>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        {/* Favorite Button */}
        <FavoriteButton
          isFavorite={favorite}
          onPress={() => toggleFavorite(product.id)}
          variant="full"
          style={styles.favoriteButton}
          testID="detail-favorite-button"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingBottom: SPACING.xxl,
  },
  imageGallery: {
    backgroundColor: COLORS.surface,
  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.85,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.xs,
    paddingVertical: SPACING.sm,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.border,
  },
  dotActive: {
    width: 18,
    backgroundColor: COLORS.primary,
  },
  infoContainer: {
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  categoryBadge: {
    backgroundColor: COLORS.primary + '15',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  categoryText: {
    color: COLORS.primary,
    fontSize: FONT_SIZE.xs,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  brand: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  title: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: '800',
    color: COLORS.text,
    lineHeight: 32,
  },
  priceContainer: {
    gap: SPACING.xs,
  },
  price: {
    fontSize: FONT_SIZE.xxxl,
    fontWeight: '800',
    color: COLORS.text,
  },
  priceOriginalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  priceOriginal: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textTertiary,
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    backgroundColor: COLORS.error,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  discountText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.xs,
    fontWeight: '700',
  },
  stockBadge: {
    backgroundColor: COLORS.success + '15',
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  stockBadgeLow: {
    backgroundColor: COLORS.warning + '20',
  },
  stockText: {
    color: COLORS.success,
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
  },
  stockTextLow: {
    color: COLORS.warning,
  },
  section: {
    gap: SPACING.sm,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    color: COLORS.text,
  },
  description: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  favoriteButton: {
    marginTop: SPACING.sm,
  },
});
