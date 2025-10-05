import { type ClassValue, clsx } from 'clsx';

/**
 * Utility function to merge class names
 * Useful for conditional styling
 * @param inputs - Class names to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Format currency to Sri Lankan Rupees
 * @param amount - Amount to format
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number): string {
  return `Rs. ${amount.toLocaleString('en-LK')}`;
}

/**
 * Format date to readable string
 * @param date - Date to format
 * @returns Formatted date string
 */
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Truncate text to specified length
 * @param text - Text to truncate
 * @param length - Maximum length
 * @returns Truncated text with ellipsis
 */
export function truncate(text: string, length: number = 50): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

/**
 * Generate unique ID for orders
 * @returns Unique timestamp-based ID
 */
export function generateId(): number {
  return Date.now();
}

/**
 * Validate table number format
 * @param tableNumber - Table number to validate
 * @returns Boolean indicating if valid
 */
export function isValidTableNumber(tableNumber: string): boolean {
  return tableNumber.trim().length > 0;
}

/**
 * Calculate percentage
 * @param value - Current value
 * @param total - Total value
 * @returns Percentage as number
 */
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}