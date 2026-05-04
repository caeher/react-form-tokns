# ProgressField

> Visual indicator of progress or completion.

## Importation

```tsx
import { ProgressField } from '@caeher/react-form-tokns';
```

## Description

The `ProgressField` displays a progress bar with various styles and colors. It supports gradients, striped patterns, different sizes, and an interactive mode so the user can drag the progress value.

## Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `value` | `number` | `0` | No | Current value |
| `defaultValue` | `number` | `0` | No | Initial value for uncontrolled usage |
| `min` | `number` | `0` | No | Minimum value |
| `max` | `number` | `100` | No | Maximum value |
| `step` | `number` | `1` | No | Drag increment when interactive |
| `variant` | `'default' \| 'gradient' \| 'striped'`| `'default'` | No | Visual style |
| `color` | `'cyan' \| 'green' \| 'amber' \| 'red'`| `'cyan'` | No | Bar color |
| `size` | `'sm' \| 'md' \| 'lg'`| `'md'` | No | Bar thickness |
| `showValue`| `boolean` | `true` | No | Show percentage text |
| `interactive` | `boolean` | `false` | No | Enables dragging the progress bar |

## Eventos

- `onChange`: Emits a synthetic event `{ target: { name, value }, persist: () => {} }`.

## Uso Básico

```tsx
<ProgressField value={75} color="green" variant="gradient" />
```

## Interactive Example

```tsx
<ProgressField
  label="Setup Completion"
  name="progress"
  value={progress}
  onChange={(e) => setProgress(e.target.value)}
  variant="striped"
  interactive
/>
```

## Accesibilidad

- Uses `role="progressbar"` in read-only mode.
- Uses a native `input[type="range"]` in interactive mode for keyboard and pointer support.
