# Integration Rules

## Imports and Dependencies

- Import consumer-facing components from `@caeher/react-form-tokns`.
- Use local deep imports only when editing the library itself.
- Expect React and ReactDOM as peer dependencies.
- Install `lucide-react` when using icon-capable fields.
- Install `@internationalized/date` when using `CalendarField`, `DatetimeField`, or related date helpers.
- Treat Tailwind CSS v4 as part of the library's styling contract.

## Event Model

Use a single generic form handler only if it understands both native and synthetic events.

### Native or native-like field family

- `TextField`
- `TextareaField`
- `CheckboxField`
- `RadioGroupField`
- `SwitchField`
- `SearchField` while typing

For these, read:

```ts
event.target.name
event.target.value
event.target.checked // checkbox and switch
```

### Synthetic event field family

These emit an object shaped like `{ target: { name, value }, persist() {} }`:

- `SelectField`
- `ComboboxField`
- `MultiSelectField`
- `CalendarField`
- `ToggleField`
- `NumberField`
- `PhoneField`
- `CurrencyField`
- `InputOtpField`
- `ProgressField`
- `TimeField`
- `DatetimeField`
- `ColorPickerField`
- `UploadField`

Use only the fields you actually need from `event.target`. Do not rely on full browser event methods.

### Important exception

- `SearchField` uses a normal input change event while typing, but its clear action emits a synthetic-like object cast to a change event.
- Safest rule: for `SearchField`, depend only on `event.target.name` and `event.target.value`.

## Value Shapes

- `TextField`, `TextareaField`, `SearchField`: `string`
- `CheckboxField`, `SwitchField`: boolean via `checked`
- `RadioGroupField`, `SelectField`, `ComboboxField`: `string | number`
- `MultiSelectField`, `ToggleField`: `(string | number)[]`
- `CalendarField`: `YYYY-MM-DD`
- `TimeField`: `HH:mm` or `HH:mm:ss`
- `DatetimeField`: `YYYY-MM-DD HH:mm` or `YYYY-MM-DD HH:mm:ss`
- `NumberField`, `ProgressField`: `number`
- `CurrencyField`: `number | null`
- `PhoneField`: full international string such as `+1 415 555 2671`
- `ColorPickerField`: string in the configured `format`
- `UploadField`: `UploadFieldItem[]`

## Date and Time Parsing

- Use `parseDateValue` for mixed persisted date inputs such as `CalendarDate`, native `Date`, ISO strings, database datetime strings, and Unix timestamps.
- Use `parseTimeValue` for `HH:mm`, `HH:mm:ss`, `h:mm AM/PM`, and datetime-derived time strings.
- Prefer feeding these components the same canonical format they emit unless the task is specifically about migration or normalization.

## Hidden Native Controls

Several custom controls keep a hidden input or select synchronized for compatibility with forms and accessibility:

- `SelectField`
- `ComboboxField`
- `MultiSelectField`
- `CalendarField`
- `TimeField`
- `DatetimeField`
- `PhoneField`
- `CurrencyField`
- `ColorPickerField`
- `UploadField`

Do not remove these hidden controls casually when editing the library.

## Known Limitations in the Current Implementation

- `TimeField` exposes `min` and `max` props, but the current implementation does not enforce them.
- `DatetimeField` uses `min` and `max` only for calendar-date restriction; it does not enforce time-of-day boundaries.
- `NumberField` is button-driven and the visible input is `readOnly`.
- `ProgressField` becomes interactive by default when `onChange` is present unless `interactive` is explicitly set.
- `UploadField` uploads automatically only when `uploadUrl` is provided.

Treat these as current-library facts, not desired future behavior.

## Recommended Generic Handler Pattern

```tsx
type FormChangeEvent =
  | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  | {
      target: {
        name: string;
        value: string | number | null | (string | number)[] | UploadFieldItem[];
        type?: string;
        checked?: boolean;
      };
      persist: () => void;
    };

function handleChange(event: FormChangeEvent) {
  const target = event.target;

  if ('type' in target && target.type === 'checkbox' && 'checked' in target) {
    setForm((prev) => ({ ...prev, [target.name]: target.checked }));
    return;
  }

  setForm((prev) => ({ ...prev, [target.name]: target.value }));
}
```

Use a dedicated boolean handler only when that keeps the consumer code simpler.
