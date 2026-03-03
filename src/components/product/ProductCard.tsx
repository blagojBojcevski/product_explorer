import React, { memo } from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, View } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from '@/constants';
import { formatPrice, titleCase, truncateText } from '@/utils/formatters';
import { FavoriteButton } from '../common/FavoriteButton';
import { RatingStars } from '../common/RatingStars';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onPress: () => void;
  onFavoriteToggle: () => void;
}

export const ProductCard = memo(function ProductCard({
  product,
  isFavorite,
  onPress,
  onFavoriteToggle,
}: ProductCardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={`${product.title}, $${product.price}`}
      testID={`product-card-${product.id}`}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.thumbnail }}
          style={styles.image}
          resizeMode="cover"
          accessibilityLabel={product.title}
        />
        <FavoriteButton
          isFavorite={isFavorite}
          onPress={onFavoriteToggle}
          style={styles.favoriteButton}
          testID={`favorite-button-${product.id}`}
        />
        {product.discountPercentage > 5 ? (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              -{Math.round(product.discountPercentage)}%
            </Text>
          </View>
        ) : null}
      </View>
      <View style={styles.info}>
        <Text style={styles.category}>{titleCase(product.category)}</Text>
        <Text style={styles.title} numberOfLines={2}>
          {truncateText(product.title, 50)}
        </Text>
        <RatingStars rating={product.rating} size="sm" />
        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
          {product.stock < 10 ? (
            <Text style={styles.stockWarning}>Only {product.stock} left</Text>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: SPACING.xs,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    aspectRatio: 1,
    backgroundColor: COLORS.border,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
  },
  discountBadge: {
    position: 'absolute',
    top: SPACING.sm,
    left: SPACING.sm,
    backgroundColor: COLORS.error,
    borderRadius: BORDER_RADIUS.sm,
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
  },
  discountText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.xs,
    fontWeight: '700',
  },
  info: {
    padding: SPACING.sm,
    gap: SPACING.xs,
  },
  category: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.primary,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text,
    fontWeight: '600',
    lineHeight: 18,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.xs,
  },
  price: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
    fontWeight: '700',
  },
  stockWarning: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.warning,
    fontWeight: '500',
  },
});
