# SearchField

> Dedicated search input with built-in icon, clear action, and optional loading state.

## Importation

```tsx
import { SearchField } from '@caeher/react-form-tokns';
```

## Description

The `SearchField` is a specialized text input tuned for search experiences. It ships with a leading search icon, optional loading feedback, and a quick clear action while preserving the same field wrapper API as the rest of the system.

## Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `label` | `string` | - | No | Label text |
| `hint` | `string` | - | No | Helper copy |
| `error` | `string` | - | No | Error state message |
| `value` | `string` | - | No | Controlled value |
| `defaultValue` | `string` | `''` | No | Initial uncontrolled value |
| `loading` | `boolean` | `false` | No | Shows a spinner in the trailing action area |
| `clearable` | `boolean` | `true` | No | Enables the clear button |
| `onClear` | `() => void` | - | No | Called after the field is cleared |
| `icon` | `ElementType` | `Search` | No | Override for the leading icon |

## Events

- `onChange`: Uses the standard React input change event.

## Basic Usage

```tsx
<SearchField
  label="Knowledge Base"
  placeholder="Search docs, snippets, or tickets..."
/>
```

## Accessibility

- Uses `type="search"` for native browser semantics.
- Preserves the same ARIA helper/error wiring as `TextField`.

## Implementation Notes

- Supports both controlled and uncontrolled usage.
- The clear action focuses the input again after resetting the value.
