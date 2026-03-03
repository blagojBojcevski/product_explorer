/**
 * Formats a number as a USD price string
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

/**
 * Formats a decimal rating to a display string with 1 decimal
 */
export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

/**
 * Formats a discount percentage for display
 */
export function formatDiscount(percentage: number): string {
  return `-${Math.round(percentage)}%`;
}

/**
 * Calculates the discounted price
 */
export function calculateDiscountedPrice(price: number, discountPercentage: number): number {
  return price * (1 - discountPercentage / 100);
}

/**
 * Capitalizes the first letter of each word in a string
 */
export function titleCase(str: string): string {
  return str
    .split(/[-\s]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Truncates text to a given length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
}
