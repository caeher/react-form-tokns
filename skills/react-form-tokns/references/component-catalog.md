# Component Catalog

## Standard Inputs

### `TextField`

Use for standard single-line input. Prefer it when normal HTML input behavior is desired with the library's shared visual and accessibility wrapper.

### `TextareaField`

Use for multi-line text. Treat it like a native textarea with the same wrapper conventions as `TextField`.

### `SearchField`

Use for search UX with leading icon, clear action, and optional loading state. Keep handlers tolerant of its mixed native/synthetic behavior.

## Choice Controls

### `CheckboxField`

Use for independent booleans. Read `checked`, not `value`.

### `SwitchField`

Use for a settings-style boolean toggle. Read `checked`, not `value`.

### `RadioGroupField`

Use for mutually exclusive choices when all options should remain visible.

### `SelectField`

Use for short single-choice lists with optional icons or images. It is custom UI backed by a hidden native `select`.

### `ComboboxField`

Use for searchable single-select flows or long option lists. Options can include `description` and `keywords`.

### `MultiSelectField`

Use for searchable multi-select flows. Expect and store an array value.

### `ToggleField`

Use for compact icon-or-button selection patterns. Expect an array value even when the field behaves like single-select.

## Date and Time

### `CalendarField`

Use for date-only selection. Store the emitted `YYYY-MM-DD` string.

### `TimeField`

Use for time-only selection. Store the emitted `HH:mm` or `HH:mm:ss` string.

### `DatetimeField`

Use for combined date and time selection. Store the emitted `YYYY-MM-DD HH:mm` or `YYYY-MM-DD HH:mm:ss` string.

## Numeric and Progress

### `NumberField`

Use when step buttons are the intended interaction. Do not expect free typing.

### `CurrencyField`

Use for locale-aware money input. Store `number | null`, not a formatted display string.

### `ProgressField`

Use for read-only progress display or interactive range-style editing. Remember that `onChange` makes it interactive by default.

## Communication and Identity

### `PhoneField`

Use when a country-aware phone input is needed. Store the full international string.

### `InputOtpField`

Use for short verification codes. Store the full code as one string.

## Visual and File Inputs

### `ColorPickerField`

Use when the consumer needs a visual picker and a formatted color string. Set `format` deliberately.

### `UploadField`

Use for local file selection, previews, removal, and optional auto-upload. Store `UploadFieldItem[]`.

When `uploadUrl` is provided:

- the field uploads automatically
- each item can move through `idle`, `uploading`, `uploaded`, or `error`
- `mapUploadResponse` can normalize server payloads into final item shape

## Helper Utilities

### `parseDateValue`

Use when persisted date data arrives in mixed formats and needs normalization before interacting with calendar-based components.

### `parseTimeValue`

Use when persisted time data can be 24-hour, 12-hour, or embedded in datetime strings.
