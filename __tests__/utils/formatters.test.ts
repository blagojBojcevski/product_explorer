import {
  formatPrice,
  formatRating,
  formatDiscount,
  calculateDiscountedPrice,
  titleCase,
  truncateText,
} from '../../src/utils/formatters';

describe('formatters', () => {
  describe('formatPrice', () => {
    it('formats a standard price correctly', () => {
      expect(formatPrice(29.99)).toBe('$29.99');
    });

    it('formats a whole number with two decimal places', () => {
      expect(formatPrice(100)).toBe('$100.00');
    });

    it('formats zero correctly', () => {
      expect(formatPrice(0)).toBe('$0.00');
    });

    it('formats large numbers with proper comma separators', () => {
      expect(formatPrice(1234.56)).toBe('$1,234.56');
    });
  });

  describe('formatRating', () => {
    it('formats rating to 1 decimal place', () => {
      expect(formatRating(4.567)).toBe('4.6');
    });

    it('formats a whole number rating', () => {
      expect(formatRating(5)).toBe('5.0');
    });

    it('formats minimum rating', () => {
      expect(formatRating(0)).toBe('0.0');
    });
  });

  describe('formatDiscount', () => {
    it('formats discount percentage with minus sign', () => {
      expect(formatDiscount(15)).toBe('-15%');
    });

    it('rounds decimal discount to nearest integer', () => {
      expect(formatDiscount(12.6)).toBe('-13%');
    });

    it('formats 0% discount', () => {
      expect(formatDiscount(0)).toBe('-0%');
    });
  });

  describe('calculateDiscountedPrice', () => {
    it('calculates correct discounted price', () => {
      expect(calculateDiscountedPrice(100, 20)).toBeCloseTo(80);
    });

    it('returns original price when discount is 0', () => {
      expect(calculateDiscountedPrice(50, 0)).toBe(50);
    });

    it('handles fractional discounts', () => {
      expect(calculateDiscountedPrice(200, 12.5)).toBe(175);
    });
  });

  describe('titleCase', () => {
    it('capitalizes first letter of each word', () => {
      expect(titleCase('hello world')).toBe('Hello World');
    });

    it('handles hyphenated words', () => {
      expect(titleCase('mens-shirts')).toBe('Mens Shirts');
    });

    it('handles single word', () => {
      expect(titleCase('electronics')).toBe('Electronics');
    });

    it('lowercases everything except first letters', () => {
      expect(titleCase('UPPER CASE')).toBe('Upper Case');
    });
  });

  describe('truncateText', () => {
    it('returns text unchanged when within limit', () => {
      expect(truncateText('Short text', 20)).toBe('Short text');
    });

    it('truncates text with ellipsis when over limit', () => {
      const result = truncateText('This is a very long text that should be truncated', 20);
      expect(result).toContain('…');
      expect(result.length).toBeLessThanOrEqual(21); // 20 chars + ellipsis
    });

    it('handles exact length match', () => {
      expect(truncateText('exact', 5)).toBe('exact');
    });
  });
});
