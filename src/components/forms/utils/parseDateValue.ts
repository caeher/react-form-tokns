import { CalendarDate } from '@internationalized/date';

/**
 * Parses various date formats into a CalendarDate object.
 * Supports: null, '', "YYYY-MM-DD", "YYYY-MM-DD HH:mm:ss", ISO strings, and Date objects.
 */
export function parseDateValue(value: unknown): CalendarDate | null {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  if (value instanceof CalendarDate) {
    return value;
  }

  // Handle Date objects
  if (value instanceof Date) {
    if (isNaN(value.getTime())) return null;
    return new CalendarDate(value.getFullYear(), value.getMonth() + 1, value.getDate());
  }

  const str = String(value).trim();

  // Handle numeric timestamps (Unix timestamp in seconds or milliseconds)
  if (/^\d+$/.test(str)) {
    const num = parseInt(str, 10);
    // Guess if it's seconds or milliseconds
    const date = new Date(num > 10000000000 ? num : num * 1000);
    if (!isNaN(date.getTime())) {
      return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
    }
  }

  // Match YYYY-MM-DD from the start of the string (handles ISO, DB datetime, etc.)
  const dateRegex = /^(\d{4})-(\d{2})-(\d{2})/;
  const match = str.match(dateRegex);

  if (match) {
    try {
      // We use the matched parts to avoid parseDate failing on extra time info
      return new CalendarDate(
        parseInt(match[1], 10),
        parseInt(match[2], 10),
        parseInt(match[3], 10)
      );
    } catch (e) {
      console.error('Error parsing date string:', str, e);
      return null;
    }
  }

  // Fallback to native Date parsing
  try {
    const d = new Date(str);
    if (!isNaN(d.getTime())) {
      return new CalendarDate(d.getFullYear(), d.getMonth() + 1, d.getDate());
    }
  } catch {
    // Silent fail
  }

  return null;
}
