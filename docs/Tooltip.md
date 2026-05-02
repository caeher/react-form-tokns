# Tooltip

> A contextual label shown on hover or focus.

## Importation

```tsx
import { Tooltip } from '@caeher/react-form-tokns';
```

## Description

The `Tooltip` provides short, descriptive text for an element. It appears after a brief delay when the user hovers over or focuses on the trigger element.

## Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `content` | `ReactNode` | - | Yes | Tooltip message |
| `side` | `'top' \| 'bottom' \| 'left' \| 'right'`| `'top'` | No | Preferred side |
| `delay` | `number` | `300` | No | Delay in ms before showing |

## Accesibilidad

- Uses `role="tooltip"`.
- Triggered by both mouse and keyboard focus.
