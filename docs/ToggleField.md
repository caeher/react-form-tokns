# ToggleField

> A button group for choosing one or multiple options.

## Importation

```tsx
import { ToggleField } from '@caeher/react-form-tokns';
```

## Description

The `ToggleField` provides a row of buttons (toggles) that allow users to select one or more options. It supports icons, labels, and tooltips for each option.

## Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `options` | `ToggleOption[]` | `[]` | Yes | `{ value, label?, icon?, hint? }` |
| `value` | `(string \| number)[]`| `[]` | No | Active values |
| `multiple` | `boolean` | `false` | No | Allow multiple selection |
| `size` | `'sm' \| 'md' \| 'lg'`| `'md'` | No | Button size |
| `disabled` | `boolean` | `false` | No | Disabled state |

## Uso Básico

```tsx
<ToggleField 
  options={[
    { label: 'Left', value: 'left', icon: AlignLeft },
    { label: 'Center', value: 'center', icon: AlignCenter },
    { label: 'Right', value: 'right', icon: AlignRight }
  ]} 
/>
```

## Dependencias

- `Tooltip` (UI component)
