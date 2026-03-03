import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from '@/constants';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onPress: () => void;
  style?: ViewStyle;
  variant?: 'icon' | 'full';
  testID?: string;
}

export function FavoriteButton({
  isFavorite,
  onPress,
  style,
  variant = 'icon',
  testID = 'favorite-button',
}: FavoriteButtonProps) {
  if (variant === 'full') {
    return (
      <TouchableOpacity
        style={[styles.fullButton, isFavorite ? styles.fullButtonActive : styles.fullButtonInactive, style]}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        accessibilityState={{ selected: isFavorite }}
        testID={testID}
      >
        <Text style={[styles.fullButtonIcon]}>{isFavorite ? '♥' : '♡'}</Text>
        <Text style={[styles.fullButtonText, isFavorite ? styles.fullButtonTextActive : styles.fullButtonTextInactive]}>
          {isFavorite ? 'Saved to Favorites' : 'Add to Favorites'}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.iconButton, style]}
      onPress={onPress}
      hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
      accessibilityRole="button"
      accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      accessibilityState={{ selected: isFavorite }}
      testID={testID}
    >
      <Text style={[styles.iconText, { color: isFavorite ? COLORS.favorite : COLORS.favoriteInactive }]}>
        {isFavorite ? '♥' : '♡'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.surface,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconText: {
    fontSize: FONT_SIZE.xl,
    lineHeight: 22,
  },
  fullButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 2,
  },
  fullButtonActive: {
    backgroundColor: COLORS.favorite + '15',
    borderColor: COLORS.favorite,
  },
  fullButtonInactive: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.primary,
  },
  fullButtonIcon: {
    fontSize: FONT_SIZE.xl,
    lineHeight: 24,
    color: COLORS.favorite,
  },
  fullButtonText: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
  },
  fullButtonTextActive: {
    color: COLORS.favorite,
  },
  fullButtonTextInactive: {
    color: COLORS.primary,
  },
});
