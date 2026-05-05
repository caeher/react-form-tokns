# ComboboxField

> Searchable single-select field with a popover command-style picker.

## Importation

```tsx
import { ComboboxField } from '@caeher/react-form-tokns';
```

## Description

The `ComboboxField` combines custom select behavior with inline filtering. It is useful when the option list is longer, role-based, or easier to scan through search than a static dropdown.

## Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `label` | `string` | - | No | Label text |
| `hint` | `string` | - | No | Helper text shown below the field |
| `error` | `string` | - | No | Error message |
| `options` | `ComboboxOption[]` | `[]` | No | Array of `{ label, value, icon?, image?, description?, keywords? }` |
| `value` | `string \| number` | - | No | Selected value |
| `defaultValue` | `string \| number` | `''` | No | Initial uncontrolled value |
| `placeholder` | `string` | `'Search and select...'` | No | Empty trigger text |
| `searchPlaceholder` | `string` | `'Filter options...'` | No | Filter input placeholder |
| `clearable` | `boolean` | `true` | No | Shows a quick clear action |

## Events

- `onChange`: Emits a synthetic event `{ target: { name, value } }`.

## Basic Usage

```tsx
<ComboboxField
  label="Assigned Lead"
  name="lead"
  options={[
    { label: 'Felix Tran', value: 'felix', description: 'Frontend systems owner' },
    { label: 'Ari West', value: 'ari', description: 'Design direction' }
  ]}
/>
```

## Accessibility

- Keeps a hidden native `select` synchronized for form compatibility.
- Connects helper and error text via `aria-describedby`.

## Implementation Notes

- Shares the same field wrapper pattern as the rest of the library.
- Option filtering checks `label`, `description`, `value`, and `keywords`.
