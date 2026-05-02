# DatetimeField

> Combined date and time picker.

## Importation

```tsx
import { DatetimeField } from '@caeher/react-form-tokns';
```

## Description

The `DatetimeField` combines the functionality of `CalendarField` and `TimeField` into a single, cohesive component. Users can pick a date from a grid and set the time using selection columns.

## Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `value` | `string` | `''` | No | Date-time string |
| `use24Hour`| `boolean` | `true` | No | 24-hour time format |
| `showSeconds`| `boolean` | `false` | No | Show seconds in time |
| `min` | `string` | - | No | Minimum datetime |
| `max` | `string` | - | No | Maximum datetime |

## Uso Básico

```tsx
<DatetimeField label="Event Start" use24Hour={false} />
```

## Dependencias

- `CalendarGrid` (Utility)
- `Popover` (UI component)
- `parseDateValue`, `parseTimeValue` (Utilities)
