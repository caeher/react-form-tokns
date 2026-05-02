# ProgressField

> Visual indicator of progress or completion.

## Importation

```tsx
import { ProgressField } from '@caeher/react-form-tokns';
```

## Description

The `ProgressField` displays a progress bar with various styles and colors. It supports gradients, striped patterns, and different sizes.

## Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `value` | `number` | `0` | No | Current value |
| `max` | `number` | `100` | No | Maximum value |
| `variant` | `'default' \| 'gradient' \| 'striped'`| `'default'` | No | Visual style |
| `color` | `'cyan' \| 'green' \| 'amber' \| 'red'`| `'cyan'` | No | Bar color |
| `size` | `'sm' \| 'md' \| 'lg'`| `'md'` | No | Bar thickness |
| `showValue`| `boolean` | `true` | No | Show percentage text |

## Uso Básico

```tsx
<ProgressField value={75} color="green" variant="gradient" />
```

## Accesibilidad

- Uses `role="progressbar"`.
- Supports `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`.
