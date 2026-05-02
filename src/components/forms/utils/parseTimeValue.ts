export interface ParsedTime {
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * Parses time strings into a structured object.
 * Supports: "HH:mm", "HH:mm:ss", "h:mm AM/PM", and extraction from datetime strings.
 */
export function parseTimeValue(value: unknown): ParsedTime | null {
  if (!value || typeof value !== 'string') return null;

  const str = value.trim();

  // Try to match HH:mm or HH:mm:ss
  const timeRegex = /(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)?/i;
  const match = str.match(timeRegex);

  if (match) {
    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const seconds = match[3] ? parseInt(match[3], 10) : 0;
    const ampm = match[4]?.toUpperCase();

    if (ampm) {
      if (ampm === 'PM' && hours < 12) hours += 12;
      if (ampm === 'AM' && hours === 12) hours = 0;
    }

    if (hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60 && seconds >= 0 && seconds < 60) {
      return { hours, minutes, seconds };
    }
  }

  return null;
}
