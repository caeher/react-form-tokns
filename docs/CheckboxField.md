# CheckboxField

> Standard checkbox for boolean or multiple choice selection.

## Importation

```tsx
import { CheckboxField } from '@caeher/react-form-tokns';
```

## Description

The `CheckboxField` provides a custom-styled checkbox that maintains native behavior. It supports labels, hints, and icons, with a distinct visual style for checked and disabled states.

## Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `label` | `string` | - | No | Label text |
| `hint` | `string` | - | No | Helpful text below |
| `error` | `string` | - | No | Error message |
| `inline` | `boolean` | `false` | No | Inline layout |
| `icon` | `ElementType` | - | No | Icon next to label |
| `iconPosition`| `'left' \| 'right'`| `'left'` | No | Icon placement |
| `disabled` | `boolean` | `false` | No | Disables interaction |

## Eventos

- Supports standard `onChange` and `checked` props.

## Uso Básico

```tsx
<CheckboxField label="Accept terms" />
```

## Ejemplos Avanzados

```tsx
<CheckboxField 
  label="Subscribe" 
  hint="Get weekly updates"
  icon={Bell}
  inline
/>
```

## Accesibilidad

- Uses a screen-reader-only native input for accessibility.
- Linked label for easy clicking.
- Support for `aria-invalid` and `aria-describedby`.

## Dependencias

- `lucide-react` (Check icon)

## Notas de Implementación

- Custom styled checkbox box using Tailwind peer-checked classes.
