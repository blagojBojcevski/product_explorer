import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, StyleSheet } from 'react-native';
import type { RootStackParamList } from '@/types';
import { ProductListScreen, ProductDetailScreen } from '@/screens';
import { COLORS, FONT_SIZE, SPACING } from '@/constants';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.surface },
          headerTitleStyle: styles.headerTitle,
          headerTintColor: COLORS.primary,
          headerShadowVisible: true,
          contentStyle: { backgroundColor: COLORS.background },
        }}
      >
        <Stack.Screen
          name="ProductList"
          component={ProductListScreen}
          options={{
            title: 'Product Explorer',
            headerRight: () => (
              <Text style={styles.headerLogo}>🛍️</Text>
            ),
          }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{
            title: 'Product Details',
            headerBackTitle: 'Back',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    color: COLORS.text,
  },
  headerLogo: {
    fontSize: FONT_SIZE.xl,
    marginRight: SPACING.xs,
  },
});
