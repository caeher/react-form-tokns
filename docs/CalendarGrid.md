# CalendarGrid

> A utility component for rendering date selection grids.

## Importation

```tsx
import { CalendarGrid } from '../components/forms/utils/CalendarGrid';
```

## Description

The `CalendarGrid` is a specialized component used by `CalendarField` and `DatetimeField`. it renders a monthly grid of days, provides month/year selection, and navigation controls.

## API / Props

| Prop | Type | Description |
|---|---|---|
| `viewDate` | `CalendarDate` | The month currently being viewed |
| `onViewDateChange`| `(date) => void` | Callback when month/year changes |
| `selectedDate` | `CalendarDate \| null`| Currently selected date |
| `onDateSelect` | `(date) => void` | Callback when a day is clicked |
| `minDate` | `CalendarDate` | Minimum selectable date |
| `maxDate` | `CalendarDate` | Maximum selectable date |

## Dependencias

- `@internationalized/date`
- `SelectField`
- `lucide-react`
