# TextField

> Standard single-line text input with optional icon integration.

## Importation

```tsx
import { TextField } from '@caeher/react-form-tokns';
```

## Description

The `TextField` component is a robust text input field designed for premium form experiences. It supports labels, hints, error states, and icon integration, while maintaining full accessibility and responsive layouts.

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

Supports all standard HTML input events. The `onChange` event follows the synthetic event model: `{ target: { name, value }, persist: () => {} }`.

## Uso Básico

```tsx
<TextField 
  label="Username" 
  placeholder="Enter your username" 
  onChange={(e) => console.log(e.target.value)} 
/>
```

## Ejemplos Avanzados

```tsx
<TextField 
  label="Email" 
  type="email"
  icon={Mail} 
  iconPosition="left"
  hint="We'll never share your email."
  error={emailError}
  inline
/>
```

## Accesibilidad

- Uses `useId` to link labels and helper text to the input.
- Supports `aria-invalid` and `aria-describedby` for error and hint management.
- Proper focus states for keyboard navigation.

## Dependencias

- `react` (useId, forwardRef)
- `lucide-react` (for icons)

## Notas de Implementación

- Wrapped with `forwardRef` to allow access to the underlying `HTMLInputElement`.
- Built with Tailwind CSS v4 using modern tokens.
