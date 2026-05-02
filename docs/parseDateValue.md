# parseDateValue

> Utility for parsing various date formats.

## Importation

```tsx
import { parseDateValue } from '@caeher/react-form-tokns';
```

## Description

A robust utility that attempts to parse unknown inputs into a `@internationalized/date` `CalendarDate` object.

## API

### `parseDateValue(value: unknown): CalendarDate | null`

Supports:
- `CalendarDate` objects (returns as-is)
- Native `Date` objects
- ISO 8601 strings
- Database datetime strings (`YYYY-MM-DD HH:mm:ss`)
- Unix timestamps (numeric strings)
- Standard strings like "YYYY-MM-DD"
