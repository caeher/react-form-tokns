# RadioGroupField

> Group of radio buttons for single choice selection.

## Importation

```tsx
import { RadioGroupField } from '@caeher/react-form-tokns';
```

## Description

The `RadioGroupField` manages a set of radio options, ensuring only one can be selected at a time. It provides a clean, vertically or horizontally aligned layout with custom-styled radio indicators.

## Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `label` | `string` | - | No | Group label |
| `hint` | `string` | - | No | Group hint |
| `error` | `string` | - | No | Group error |
| `options` | `RadioOption[]` | `[]` | Yes | `{ label, value }` |
| `value` | `string \| number`| - | No | Currently selected value |
| `inline` | `boolean` | `false` | No | Inline layout for the group |
| `icon` | `ElementType` | - | No | Group icon |
| `disabled` | `boolean` | `false` | No | Disables all options |

## Eventos

- `onChange`: Triggered when a new option is selected.

## Uso Básico

```tsx
const options = [
  { label: 'Red', value: 'red' },
  { label: 'Blue', value: 'blue' }
];

<RadioGroupField 
  label="Favorite Color" 
  options={options} 
  value="red" 
/>
```

## Accesibilidad

- Uses `role="radiogroup"`.
- Linked labels for all options.
- Focus management across the group.

## Dependencias

- `react` (useId, forwardRef)
