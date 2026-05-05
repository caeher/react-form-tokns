# MultiSelectField

> Searchable multi-select field with chip-style selected values.

## Importation

```tsx
import { MultiSelectField } from '@caeher/react-form-tokns';
```

## Description

The `MultiSelectField` lets users choose several options from a searchable popover. Selected items render as compact chips in the trigger, making it useful for tags, stacks, permissions, and grouped filters.

## Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `label` | `string` | - | No | Label text |
| `hint` | `string` | - | No | Helper text |
| `error` | `string` | - | No | Error message |
| `options` | `ComboboxOption[]` | `[]` | No | Array of selectable options |
| `value` | `(string \| number)[]` | - | No | Controlled selected values |
| `defaultValue` | `(string \| number)[]` | `[]` | No | Initial uncontrolled values |
| `maxSelections` | `number` | - | No | Optional upper limit for selections |
| `placeholder` | `string` | `'Select one or more...'` | No | Empty trigger copy |
| `clearable` | `boolean` | `true` | No | Shows a clear-all action |

## Events

- `onChange`: Emits a synthetic event `{ target: { name, value } }`.

## Basic Usage

```tsx
<MultiSelectField
  label="Tech Stack"
  name="stack"
  value={['react', 'typescript']}
  options={[
    { label: 'React', value: 'react' },
    { label: 'TypeScript', value: 'typescript' },
    { label: 'Tailwind CSS', value: 'tailwind' }
  ]}
/>
```

## Accessibility

- Mirrors the selected values into a hidden native `select[multiple]`.
- Uses the shared label, hint, and error infrastructure from the design system.

## Implementation Notes

- Supports inline filtering inside the popover.
- `maxSelections` prevents adding more items once the limit is reached.
