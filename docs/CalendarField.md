# CalendarField

> Premium date picker with internationalization support.

## Importation

```tsx
import { CalendarField } from '@caeher/react-form-tokns';
```

## Description

The `CalendarField` is a highly customizable date picker built on `@internationalized/date`. It supports various date formats and provides a premium calendar grid overlay.

## Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `label` | `string` | - | No | Label text |
| `hint` | `string` | - | No | Hint text |
| `error` | `string` | - | No | Error message |
| `value` | `string \| CalendarDate` | - | No | Current date value |
| `min` | `string \| CalendarDate` | - | No | Minimum date |
| `max` | `string \| CalendarDate` | - | No | Maximum date |
| `inline` | `boolean` | `false` | No | Inline layout |
| `disabled` | `boolean` | `false` | No | Disabled state |

## Eventos

- `onChange`: Returns an object with the ISO date string.

## Uso Básico

```tsx
<CalendarField 
  label="Select Date" 
  onChange={(e) => console.log(e.target.value)} 
/>
```

## Accesibilidad

- ARIA labeling for the grid and navigation buttons.
- Keyboard navigation within the calendar grid.

## Dependencias

- `@internationalized/date`
- `Popover` (UI component)
- `CalendarGrid` (Utility component)
