# SelectField

> A premium custom dropdown replacing the native select.

## Importation

```tsx
import { SelectField } from '@caeher/react-form-tokns';
```

## Description

The `SelectField` replaces the browser's native select with a custom, themeable dropdown menu. It uses a Popover for the overlay and supports icons and images within options.

## Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `label` | `string` | - | No | Label text |
| `hint` | `string` | - | No | Helpful text below the input |
| `error` | `string` | - | No | Error message |
| `options` | `SelectOption[]` | `[]` | Yes | Array of `{ label, value, icon?, image? }` |
| `inline` | `boolean` | `false` | No | Inline layout |
| `value` | `string \| number`| - | No | Currently selected value |
| `matchTriggerWidth`| `boolean` | `true` | No | If true, dropdown matches trigger width |
| `disabled` | `boolean` | `false` | No | Disables interaction |

## Eventos

- `onChange`: Emits a synthetic event `{ target: { value, name } }`.

## Uso Básico

```tsx
const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' }
];

<SelectField 
  label="Select an option" 
  options={options} 
/>
```

## Ejemplos Avanzados

```tsx
<SelectField 
  label="User" 
  options={[
    { label: 'John Doe', value: 'john', image: '/avatars/john.jpg' },
    { label: 'Settings', value: 'settings', icon: Settings }
  ]}
  matchTriggerWidth={false}
  inline
/>
```

## Accesibilidad

- Synchronizes with a hidden native `select` element for form accessibility.
- ARIA expanded and disabled states on the trigger.

## Dependencias

- `Popover` (UI component)
- `react` (useState, forwardRef)

## Notas de Implementación

- Uses a hidden `select` element to ensure compatibility with standard form submission and validation.
- Employs a `Popover` primitive for the dropdown menu.
