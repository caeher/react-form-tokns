# PhoneField

> International phone input with dial code selection and formatted national number entry.

## Importation

```tsx
import { PhoneField } from '@caeher/react-form-tokns';
```

## Description

The `PhoneField` pairs a country picker with a telephone input so users can enter complete international numbers without losing the local formatting they expect while typing.

## Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `label` | `string` | - | No | Label text |
| `hint` | `string` | - | No | Helper copy |
| `error` | `string` | - | No | Error message |
| `value` | `string` | - | No | Full phone value including dial code |
| `defaultValue` | `string` | `''` | No | Initial uncontrolled value |
| `country` | `string` | - | No | Controlled ISO country code |
| `defaultCountry` | `string` | `'US'` | No | Default country selection |
| `countries` | `PhoneCountryOption[]` | Built-in list | No | Custom country metadata |
| `onCountryChange` | `(country) => void` | - | No | Fires when the selected country changes |

## Events

- `onChange`: Emits a synthetic event `{ target: { name, value } }`.

## Basic Usage

```tsx
<PhoneField
  label="Support Line"
  name="phone"
  defaultCountry="US"
  hint="Stored as a complete international number."
/>
```

## Accessibility

- Uses a visible `tel` input for focus and a hidden input for full-value form submission.
- Helper and error messaging follow the same ARIA mapping as other fields.

## Implementation Notes

- Includes a built-in starter list of international dialing presets.
- Reformats national digits when the country changes.
