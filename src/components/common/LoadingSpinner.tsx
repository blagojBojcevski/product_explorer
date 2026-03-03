import React from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import { COLORS, SPACING, FONT_SIZE } from '@/constants';

interface LoadingSpinnerProps {
    message?: string;
    size?: 'small' | 'large';
    fullScreen?: boolean;
}

export function LoadingSpinner({
  message,
  size = 'large',
  fullScreen = false,
}: LoadingSpinnerProps) {
  return (
    <View
      style={[styles.container, fullScreen && styles.fullScreen]}
      testID="loading-spinner"
      accessibilityRole="progressbar"
      accessibilityLabel={message ?? 'Loading'}
    >
      <ActivityIndicator size={size} color={COLORS.primary} />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.md,
  },
  fullScreen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  message: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});