# NumberField

> Numeric input with increment/decrement buttons.

## Importation

```tsx
import { NumberField } from '@caeher/react-form-tokns';
```

## Description

The `NumberField` allows users to input numbers with precise control using stepping buttons. It supports continuous increment/decrement on press and hold.

## Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `value` | `number` | - | No | Current value |
| `min` | `number` | - | No | Minimum allowed value |
| `max` | `number` | - | No | Maximum allowed value |
| `step` | `number` | `1` | No | Step increment |
| `inline` | `boolean` | `false` | No | Inline layout |
| `disabled` | `boolean` | `false` | No | Disabled state |

## Eventos

- `onChange`: Returns the new numeric value.

## Uso Básico

```tsx
<NumberField label="Quantity" min={0} max={10} step={1} />
```

## Notas de Implementación

- Uses a timer for continuous updates when holding down the +/- buttons.
- Input is read-only to ensure control through the provided buttons and prevent invalid text input.
