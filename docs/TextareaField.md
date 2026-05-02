# TextareaField

> Multi-line text input for longer content.

## Importation

```tsx
import { TextareaField } from '@caeher/react-form-tokns';
```

## Description

The `TextareaField` provides a flexible area for users to enter multi-line text. It features a custom scrollbar and supports the same layout and feedback features as the `TextField`.

## Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `label` | `string` | - | No | Floating or aligned label text |
| `hint` | `string` | - | No | Helpful text shown below the input |
| `error` | `string` | - | No | Error message that triggers red visual state |
| `inline` | `boolean` | `false` | No | Switches between vertical and horizontal layout |
| `icon` | `ElementType` | - | No | Lucide icon to display |
| `iconPosition`| `'left' \| 'right'`| `'left'` | No | Placement of the icon |
| `disabled` | `boolean` | `false` | No | Disables user interaction |

## Eventos

Supports all standard HTML textarea events.

## Uso Básico

```tsx
<TextareaField 
  label="Bio" 
  placeholder="Tell us about yourself..." 
/>
```

## Ejemplos Avanzados

```tsx
<TextareaField 
  label="Message" 
  rows={5}
  hint="Minimum 20 characters."
  error="Message is too short"
  inline
/>
```

## Accesibilidad

- Uses `useId` to link labels and helper text.
- Supports `aria-invalid` and `aria-describedby`.
- Standard keyboard focus management.

## Dependencias

- `react` (useId, forwardRef)

## Notas de Implementación

- Uses `resize-y` by default.
- Custom scrollbar styling via `custom-scrollbar` class.
