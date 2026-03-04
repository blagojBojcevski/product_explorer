import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ProductCard } from '../../src/components/product/ProductCard';
import type { Product } from '../../src/types';

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  description: 'A great test product',
  price: 49.99,
  discountPercentage: 10,
  rating: 4.3,
  stock: 50,
  brand: 'TestBrand',
  category: 'electronics',
  thumbnail: 'https://example.com/thumb.jpg',
  images: ['https://example.com/img1.jpg'],
};

describe('ProductCard', () => {
  const mockOnPress = jest.fn();
  const mockOnFavoriteToggle = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders product title, price, and category', () => {
    render(
      <ProductCard
        product={mockProduct}
        isFavorite={false}
        onPress={mockOnPress}
        onFavoriteToggle={mockOnFavoriteToggle}
      />
    );

    expect(screen.getByText('Test Product')).toBeTruthy();
    expect(screen.getByText('$49.99')).toBeTruthy();
    expect(screen.getByText('Electronics')).toBeTruthy();
  });

  it('calls onPress when card is tapped', () => {
    render(
      <ProductCard
        product={mockProduct}
        isFavorite={false}
        onPress={mockOnPress}
        onFavoriteToggle={mockOnFavoriteToggle}
      />
    );

    fireEvent.press(screen.getByTestId('product-card-1'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('calls onFavoriteToggle when favorite button is pressed', () => {
    render(
      <ProductCard
        product={mockProduct}
        isFavorite={false}
        onPress={mockOnPress}
        onFavoriteToggle={mockOnFavoriteToggle}
      />
    );

    fireEvent.press(screen.getByTestId('favorite-button-1'));
    expect(mockOnFavoriteToggle).toHaveBeenCalledTimes(1);
  });

  it('shows filled heart icon when product is a favorite', () => {
    render(
      <ProductCard
        product={mockProduct}
        isFavorite={true}
        onPress={mockOnPress}
        onFavoriteToggle={mockOnFavoriteToggle}
      />
    );

    const favoriteBtn = screen.getByTestId('favorite-button-1');
    expect(favoriteBtn).toBeTruthy();
    // The button should show filled heart (♥) for favorites
    expect(screen.getByText('♥')).toBeTruthy();
  });

  it('shows discount badge for products with significant discount', () => {
    render(
      <ProductCard
        product={{ ...mockProduct, discountPercentage: 20 }}
        isFavorite={false}
        onPress={mockOnPress}
        onFavoriteToggle={mockOnFavoriteToggle}
      />
    );

    expect(screen.getByText('-20%')).toBeTruthy();
  });

  it('does not show discount badge for products with minimal discount', () => {
    render(
      <ProductCard
        product={{ ...mockProduct, discountPercentage: 3 }}
        isFavorite={false}
        onPress={mockOnPress}
        onFavoriteToggle={mockOnFavoriteToggle}
      />
    );

    expect(screen.queryByText(/-\d+%/)).toBeNull();
  });

  it('shows stock warning for low stock products', () => {
    render(
      <ProductCard
        product={{ ...mockProduct, stock: 3 }}
        isFavorite={false}
        onPress={mockOnPress}
        onFavoriteToggle={mockOnFavoriteToggle}
      />
    );

    expect(screen.getByText('Only 3 left')).toBeTruthy();
  });
});
