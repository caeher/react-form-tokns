# TimeField

> Time picker with 12/24 hour format support.

## Importation

```tsx
import { TimeField } from '@caeher/react-form-tokns';
```

## Description

The `TimeField` allows users to select time using a clean column-based picker. It supports hours, minutes, and optional seconds, with 12h (AM/PM) and 24h modes.

## Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `use24Hour`| `boolean` | `true` | No | 24-hour format |
| `showSeconds`| `boolean` | `false` | No | Show seconds column |
| `minuteStep`| `number` | `1` | No | Increment for minutes |
| `value` | `string` | `''` | No | ISO time string |
| `inline` | `boolean` | `false` | No | Inline layout |
| `disabled` | `boolean` | `false` | No | Disabled state |

## Uso Básico

```tsx
<TimeField label="Appointment Time" use24Hour={false} />
```

## Dependencias

- `Popover` (UI component)
- `parseTimeValue` (Utility)
