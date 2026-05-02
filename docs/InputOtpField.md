# InputOtpField

> One-Time Password input field with multiple slots.

## Importation

```tsx
import { InputOtpField } from '@caeher/react-form-tokns';
```

## Description

The `InputOtpField` provides a dedicated interface for entering 4 or 6-digit codes. It features auto-focus transition between digits and paste support.

## Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `length` | `4 \| 6` | `6` | No | Number of slots |
| `value` | `string` | `''` | No | Current code |
| `autoFocus`| `boolean` | `false` | No | Auto-focus first slot |
| `inline` | `boolean` | `false` | No | Inline layout |
| `disabled` | `boolean` | `false` | No | Disabled state |

## Uso Básico

```tsx
<InputOtpField length={6} label="Verification Code" />
```

## Notas de Implementación

- Handles `Backspace` to move focus to the previous slot.
- Filters non-numeric characters automatically.
- Supports pasting full codes.
