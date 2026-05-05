# CurrencyField

> Locale-aware currency input with editable numeric mode and formatted display mode.

## Importation

```tsx
import { CurrencyField } from '@caeher/react-form-tokns';
```

## Description

The `CurrencyField` is designed for budgets, pricing, and cost estimates. It formats values with `Intl.NumberFormat`, keeps a raw editable state while focused, and returns numeric values through the library's synthetic event model.

## Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `label` | `string` | - | No | Label text |
| `hint` | `string` | - | No | Helper text |
| `error` | `string` | - | No | Error message |
| `value` | `number \| null` | - | No | Controlled numeric value |
| `defaultValue` | `number \| null` | `null` | No | Initial uncontrolled value |
| `currency` | `string` | `'USD'` | No | ISO currency code |
| `locale` | `string` | `'en-US'` | No | Locale used for formatting |
| `min` | `number` | - | No | Minimum allowed value |
| `max` | `number` | - | No | Maximum allowed value |
| `step` | `number` | `1` | No | Arrow-key increment and decrement size |
| `allowNegative` | `boolean` | `false` | No | Allows negative values |

## Events

- `onChange`: Emits a synthetic event `{ target: { name, value } }`.

## Basic Usage

```tsx
<CurrencyField
  label="Monthly Budget"
  name="budget"
  currency="USD"
  defaultValue={2400.5}
/>
```

## Accessibility

- Uses a standard text input with `inputMode="decimal"`.
- Associates hint and error content through generated IDs.

## Implementation Notes

- Displays formatted currency on blur and plain editable numbers on focus.
- Supports Arrow Up and Arrow Down keyboard adjustments.
