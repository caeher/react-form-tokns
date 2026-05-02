# parseTimeValue

> Utility for parsing time strings.

## Importation

```tsx
import { parseTimeValue } from '@caeher/react-form-tokns';
```

## Description

Parses various time formats into a structured object representing hours, minutes, and seconds.

## API

### `parseTimeValue(value: unknown): ParsedTime | null`

Returns: `{ hours: number, minutes: number, seconds: number }` or `null`.

Supports:
- "HH:mm"
- "HH:mm:ss"
- "h:mm AM/PM"
- Extraction from full datetime strings
