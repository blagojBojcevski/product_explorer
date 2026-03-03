import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZE, SPACING } from '@/constants';
import { formatRating } from '@/utils/formatters';

interface RatingStarsProps {
  rating: number;
  showNumeric?: boolean;
  size?: 'sm' | 'md';
}

export function RatingStars({ rating, showNumeric = true, size = 'md' }: RatingStarsProps) {
  const fontSize = size === 'sm' ? FONT_SIZE.xs : FONT_SIZE.sm;

  return (
    <View style={styles.container} accessibilityLabel={`Rating: ${formatRating(rating)} out of 5`}>
      <Text style={[styles.stars, { fontSize }]}>
        {'★'.repeat(Math.round(rating))}
        {'☆'.repeat(5 - Math.round(rating))}
      </Text>
      {showNumeric ? (
        <Text style={[styles.numeric, { fontSize }]}>{formatRating(rating)}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  stars: {
    color: COLORS.secondary,
    letterSpacing: 1,
  },
  numeric: {
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
});
