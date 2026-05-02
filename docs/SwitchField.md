# SwitchField

> A premium toggle switch for boolean states.

## Importation

```tsx
import { SwitchField } from '@caeher/react-form-tokns';
```

## Description

The `SwitchField` provides a modern, animated toggle switch. It's ideal for binary settings and features a premium "techno-industrial" aesthetic with glassmorphism effects.

## Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `label` | `string` | - | No | Label text |
| `hint` | `string` | - | No | Helpful text |
| `error` | `string` | - | No | Error message |
| `checked` | `boolean` | - | No | Checked state |
| `inline` | `boolean` | `false` | No | Inline layout |
| `disabled` | `boolean` | `false` | No | Disabled state |

## Uso Básico

```tsx
<SwitchField label="Enable Notifications" />
```

## Accesibilidad

- Uses `aria-checked`.
- Screen-reader compatible native checkbox backing.

## Notas de Implementación

- Uses CSS transitions for smooth toggle animation.
- Supports an `inline` mode which removes the background container for a more compact look.
