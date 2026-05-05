# Full Documentation

*Generated on 5/4/2026, 10:24:30 PM*

---

# Form Maker Documentation Index

Welcome to the comprehensive documentation for the Form Maker component library.

## Form Components
- [TextField](TextField.md)
- [SearchField](SearchField.md)
- [TextareaField](TextareaField.md)
- [SelectField](SelectField.md)
- [ComboboxField](ComboboxField.md)
- [MultiSelectField](MultiSelectField.md)
- [CheckboxField](CheckboxField.md)
- [RadioGroupField](RadioGroupField.md)
- [SwitchField](SwitchField.md)
- [CalendarField](CalendarField.md)
- [ToggleField](ToggleField.md)
- [NumberField](NumberField.md)
- [PhoneField](PhoneField.md)
- [CurrencyField](CurrencyField.md)
- [InputOtpField](InputOtpField.md)
- [ProgressField](ProgressField.md)
- [TimeField](TimeField.md)
- [DatetimeField](DatetimeField.md)
- [ColorPickerField](ColorPickerField.md)
- [UploadField](UploadField.md)

## UI Primitives
- [Popover](Popover.md)
- [Portal](Portal.md)
- [Tooltip](Tooltip.md)

## Utilities
- [CalendarGrid](CalendarGrid.md)
- [parseDateValue](parseDateValue.md)
- [parseTimeValue](parseTimeValue.md)
- [colorConversions](colorConversions.md)


---

# TextField

> Standard single-line text input with optional icon integration.

## Importation

```tsx
import { TextField } from '@caeher/react-form-tokns';
```

## Description

The `TextField` component is a robust text input field designed for premium form experiences. It supports labels, hints, error states, and icon integration, while maintaining full accessibility and responsive layouts.

## Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `label` | `string` | - | No | Floating or aligned label text |
| `hint` | `string` | - | No | Helpful text shown below the input |
| `error` | `string` | - | No | Error message that triggers red visual state |
| `inline` | `boolean` | `false` | No | Switches between vertical and horizontal layout |
| `icon` | `ElementType` | - | No | Lucide icon to display |
| `iconPosition`| `'left' \| 'right'`| `'left'` | No | Placement of the icon |
| `disabled` | `boolean` | `false` | No | Disables user interaction |

## Eventos

Supports all standard HTML input events. The `onChange` event follows the synthetic event model: `{ target: { name, value }, persist: () => {} }`.

## Uso Básico

```tsx
<TextField 
  label="Username" 
  placeholder="Enter your username" 
  onChange={(e) => console.log(e.target.value)} 
/>
```

## Ejemplos Avanzados

```tsx
<TextField 
  label="Email" 
  type="email"
  icon={Mail} 
  iconPosition="left"
  hint="We'll never share your email."
  error={emailError}
  inline
/>
```

## Accesibilidad

- Uses `useId` to link labels and helper text to the input.
- Supports `aria-invalid` and `aria-describedby` for error and hint management.
- Proper focus states for keyboard navigation.

## Dependencias

- `react` (useId, forwardRef)
- `lucide-react` (for icons)

## Notas de Implementación

- Wrapped with `forwardRef` to allow access to the underlying `HTMLInputElement`.
- Built with Tailwind CSS v4 using modern tokens.


---

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


---

# TextareaField

> Multi-line text input for longer content.

## Importation

```tsx
import { TextareaField } from '@caeher/react-form-tokns';
```

## Description

The `TextareaField` provides a flexible area for users to enter multi-line text. It features a custom scrollbar and supports the same layout and feedback features as the `TextField`.

## Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `label` | `string` | - | No | Floating or aligned label text |
| `hint` | `string` | - | No | Helpful text shown below the input |
| `error` | `string` | - | No | Error message that triggers red visual state |
| `inline` | `boolean` | `false` | No | Switches between vertical and horizontal layout |
| `icon` | `ElementType` | - | No | Lucide icon to display |
| `iconPosition`| `'left' \| 'right'`| `'left'` | No | Placement of the icon |
| `disabled` | `boolean` | `false` | No | Disables user interaction |

## Eventos

Supports all standard HTML textarea events.

## Uso Básico

```tsx
<TextareaField 
  label="Bio" 
  placeholder="Tell us about yourself..." 
/>
```

## Ejemplos Avanzados

```tsx
<TextareaField 
  label="Message" 
  rows={5}
  hint="Minimum 20 characters."
  error="Message is too short"
  inline
/>
```

## Accesibilidad

- Uses `useId` to link labels and helper text.
- Supports `aria-invalid` and `aria-describedby`.
- Standard keyboard focus management.

## Dependencias

- `react` (useId, forwardRef)

## Notas de Implementación

- Uses `resize-y` by default.
- Custom scrollbar styling via `custom-scrollbar` class.


---

# SelectField

> A premium custom dropdown replacing the native select.

## Importation

```tsx
import { SelectField } from '@caeher/react-form-tokns';
```

## Description

The `SelectField` replaces the browser's native select with a custom, themeable dropdown menu. It uses a Popover for the overlay and supports icons and images within options.

## Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `label` | `string` | - | No | Label text |
| `hint` | `string` | - | No | Helpful text below the input |
| `error` | `string` | - | No | Error message |
| `options` | `SelectOption[]` | `[]` | Yes | Array of `{ label, value, icon?, image? }` |
| `inline` | `boolean` | `false` | No | Inline layout |
| `value` | `string \| number`| - | No | Currently selected value |
| `matchTriggerWidth`| `boolean` | `true` | No | If true, dropdown matches trigger width |
| `disabled` | `boolean` | `false` | No | Disables interaction |

## Eventos

- `onChange`: Emits a synthetic event `{ target: { value, name } }`.

## Uso Básico

```tsx
const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' }
];

<SelectField 
  label="Select an option" 
  options={options} 
/>
```

## Ejemplos Avanzados

```tsx
<SelectField 
  label="User" 
  options={[
    { label: 'John Doe', value: 'john', image: '/avatars/john.jpg' },
    { label: 'Settings', value: 'settings', icon: Settings }
  ]}
  matchTriggerWidth={false}
  inline
/>
```

## Accesibilidad

- Synchronizes with a hidden native `select` element for form accessibility.
- ARIA expanded and disabled states on the trigger.

## Dependencias

- `Popover` (UI component)
- `react` (useState, forwardRef)

## Notas de Implementación

- Uses a hidden `select` element to ensure compatibility with standard form submission and validation.
- Employs a `Popover` primitive for the dropdown menu.


---

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


---

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


---

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


---

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


---

# SwitchField

> A premium toggle switch for boolean states.

## Importation

```tsx
import { SwitchField } from '@caeher/react-form-tokns';
```

## Description

The `SwitchField` provides a modern, animated toggle switch. It's ideal for binary settings and features a premium "techno-industrial" aesthetic with glassmorphism effects.

## Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `label` | `string` | - | No | Label text |
| `hint` | `string` | - | No | Helpful text |
| `error` | `string` | - | No | Error message |
| `checked` | `boolean` | - | No | Checked state |
| `inline` | `boolean` | `false` | No | Inline layout |
| `disabled` | `boolean` | `false` | No | Disabled state |

## Uso Básico

```tsx
<SwitchField label="Enable Notifications" />
```

## Accesibilidad

- Uses `aria-checked`.
- Screen-reader compatible native checkbox backing.

## Notas de Implementación

- Uses CSS transitions for smooth toggle animation.
- Supports an `inline` mode which removes the background container for a more compact look.


---

# CalendarField

> Premium date picker with internationalization support.

## Importation

```tsx
import { CalendarField } from '@caeher/react-form-tokns';
```

## Description

The `CalendarField` is a highly customizable date picker built on `@internationalized/date`. It supports various date formats and provides a premium calendar grid overlay.

## Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `label` | `string` | - | No | Label text |
| `hint` | `string` | - | No | Hint text |
| `error` | `string` | - | No | Error message |
| `value` | `string \| CalendarDate` | - | No | Current date value |
| `min` | `string \| CalendarDate` | - | No | Minimum date |
| `max` | `string \| CalendarDate` | - | No | Maximum date |
| `inline` | `boolean` | `false` | No | Inline layout |
| `disabled` | `boolean` | `false` | No | Disabled state |

## Eventos

- `onChange`: Returns an object with the ISO date string.

## Uso Básico

```tsx
<CalendarField 
  label="Select Date" 
  onChange={(e) => console.log(e.target.value)} 
/>
```

## Accesibilidad

- ARIA labeling for the grid and navigation buttons.
- Keyboard navigation within the calendar grid.

## Dependencias

- `@internationalized/date`
- `Popover` (UI component)
- `CalendarGrid` (Utility component)


---

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


---

# NumberField

> Numeric input with increment/decrement buttons.

## Importation

```tsx
import { NumberField } from '@caeher/react-form-tokns';
```

## Description

The `NumberField` allows users to input numbers with precise control using stepping buttons. It supports continuous increment/decrement on press and hold.

## Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `value` | `number` | - | No | Current value |
| `min` | `number` | - | No | Minimum allowed value |
| `max` | `number` | - | No | Maximum allowed value |
| `step` | `number` | `1` | No | Step increment |
| `inline` | `boolean` | `false` | No | Inline layout |
| `disabled` | `boolean` | `false` | No | Disabled state |

## Eventos

- `onChange`: Returns the new numeric value.

## Uso Básico

```tsx
<NumberField label="Quantity" min={0} max={10} step={1} />
```

## Notas de Implementación

- Uses a timer for continuous updates when holding down the +/- buttons.
- Input is read-only to ensure control through the provided buttons and prevent invalid text input.


---

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


---

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


---

# InputOtpField

> One-Time Password input field with multiple slots.

## Importation

```tsx
import { InputOtpField } from '@caeher/react-form-tokns';
```

## Description

The `InputOtpField` provides a dedicated interface for entering 4 or 6-digit codes. It features auto-focus transition between digits and paste support.

## Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `length` | `4 \| 6` | `6` | No | Number of slots |
| `value` | `string` | `''` | No | Current code |
| `autoFocus`| `boolean` | `false` | No | Auto-focus first slot |
| `inline` | `boolean` | `false` | No | Inline layout |
| `disabled` | `boolean` | `false` | No | Disabled state |

## Uso Básico

```tsx
<InputOtpField length={6} label="Verification Code" />
```

## Notas de Implementación

- Handles `Backspace` to move focus to the previous slot.
- Filters non-numeric characters automatically.
- Supports pasting full codes.


---

# ProgressField

> Visual indicator of progress or completion.

## Importation

```tsx
import { ProgressField } from '@caeher/react-form-tokns';
```

## Description

The `ProgressField` displays a progress bar with various styles and colors. It supports gradients, striped patterns, different sizes, and an interactive mode so the user can drag the progress value.

## Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `value` | `number` | `0` | No | Current value |
| `defaultValue` | `number` | `0` | No | Initial value for uncontrolled usage |
| `min` | `number` | `0` | No | Minimum value |
| `max` | `number` | `100` | No | Maximum value |
| `step` | `number` | `1` | No | Drag increment when interactive |
| `variant` | `'default' \| 'gradient' \| 'striped'`| `'default'` | No | Visual style |
| `color` | `'cyan' \| 'green' \| 'amber' \| 'red'`| `'cyan'` | No | Bar color |
| `size` | `'sm' \| 'md' \| 'lg'`| `'md'` | No | Bar thickness |
| `showValue`| `boolean` | `true` | No | Show percentage text |
| `interactive` | `boolean` | `false` | No | Enables dragging the progress bar |

## Eventos

- `onChange`: Emits a synthetic event `{ target: { name, value }, persist: () => {} }`.

## Uso Básico

```tsx
<ProgressField value={75} color="green" variant="gradient" />
```

## Interactive Example

```tsx
<ProgressField
  label="Setup Completion"
  name="progress"
  value={progress}
  onChange={(e) => setProgress(e.target.value)}
  variant="striped"
  interactive
/>
```

## Accesibilidad

- Uses `role="progressbar"` in read-only mode.
- Uses a native `input[type="range"]` in interactive mode for keyboard and pointer support.


---

# TimeField

> Time picker with 12/24 hour format support.

## Importation

```tsx
import { TimeField } from '@caeher/react-form-tokns';
```

## Description

The `TimeField` allows users to select time using a clean column-based picker. It supports hours, minutes, and optional seconds, with 12h (AM/PM) and 24h modes.

## Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `use24Hour`| `boolean` | `true` | No | 24-hour format |
| `showSeconds`| `boolean` | `false` | No | Show seconds column |
| `minuteStep`| `number` | `1` | No | Increment for minutes |
| `value` | `string` | `''` | No | ISO time string |
| `inline` | `boolean` | `false` | No | Inline layout |
| `disabled` | `boolean` | `false` | No | Disabled state |

## Uso Básico

```tsx
<TimeField label="Appointment Time" use24Hour={false} />
```

## Dependencias

- `Popover` (UI component)
- `parseTimeValue` (Utility)


---

# DatetimeField

> Combined date and time picker.

## Importation

```tsx
import { DatetimeField } from '@caeher/react-form-tokns';
```

## Description

The `DatetimeField` combines the functionality of `CalendarField` and `TimeField` into a single, cohesive component. Users can pick a date from a grid and set the time using selection columns.

## Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `value` | `string` | `''` | No | Date-time string |
| `use24Hour`| `boolean` | `true` | No | 24-hour time format |
| `showSeconds`| `boolean` | `false` | No | Show seconds in time |
| `min` | `string` | - | No | Minimum datetime |
| `max` | `string` | - | No | Maximum datetime |

## Uso Básico

```tsx
<DatetimeField label="Event Start" use24Hour={false} />
```

## Dependencias

- `CalendarGrid` (Utility)
- `Popover` (UI component)
- `parseDateValue`, `parseTimeValue` (Utilities)


---

# ColorPickerField

> Advanced color selection tool.

## Importation

```tsx
import { ColorPickerField } from '@caeher/react-form-tokns';
```

## Description

The `ColorPickerField` offers a visual way to select colors. It includes a saturation/value area, a hue slider, and optional alpha transparency support. It also supports presets.

## Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `format` | `'hex' \| 'rgb' \| 'hsl' \| ...`| `'hex'` | No | Color format |
| `presets` | `string[]` | (Default list) | No | Quick swatches |
| `showInput`| `boolean` | `true` | No | Show text representation |
| `value` | `string` | `'#06b6d4'` | No | Current color |

## Uso Básico

```tsx
<ColorPickerField label="Brand Color" format="hex-alpha" />
```

## Notas de Implementación

- Uses pointer events for smooth dragging on the color areas and sliders.
- Color conversions handled by internal utilities.


---

# UploadField

> Premium file upload field with drag-and-drop, preview cards, and optional server-side upload.

## Importation

```tsx
import { UploadField } from '@caeher/react-form-tokns';
```

## Description

The `UploadField` component provides a polished file upload experience aligned with the rest of the form system. It supports native file selection, drag-and-drop, thumbnail previews for images, removable uploaded items, and an optional automatic upload flow when `uploadUrl` is provided.

## Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `value` | `UploadFieldItem[]` | `[]` | No | Current selected/uploaded items |
| `uploadUrl` | `string` | - | No | When present, files are uploaded automatically with `fetch` |
| `uploadMethod` | `'POST' \| 'PUT' \| 'PATCH'` | `'POST'` | No | HTTP method for the upload request |
| `uploadFieldName` | `string` | `'file'` | No | FormData field name used for the file |
| `uploadHeaders` | `Record<string, string>` | - | No | Extra headers for the upload request |
| `uploadData` | `Record<string, string \| Blob>` | - | No | Additional fields appended to FormData |
| `mapUploadResponse` | `function` | - | No | Maps the server response into the final `UploadFieldItem` |
| `multiple` | `boolean` | `false` | No | Enables selecting multiple files |
| `maxFiles` | `number` | - | No | Maximum number of files to keep in the field |
| `previewStrategy` | `'auto' \| 'image-only' \| 'none'` | `'auto'` | No | Controls preview generation behavior |
| `removable` | `boolean` | `true` | No | Allows removing individual files |

## Eventos

`onChange` emits the standard synthetic event shape used by this library:

```ts
{
  target: {
    name,
    value: UploadFieldItem[],
    files: File[],
    uploaded: boolean
  },
  persist: () => {}
}
```

## Uso BÃ¡sico

```tsx
<UploadField
  label="Assets"
  name="assets"
  multiple
  accept="image/*,.pdf,.zip"
/>
```

## Subida Server Side

```tsx
<UploadField
  label="Gallery"
  name="gallery"
  multiple
  uploadUrl="/api/uploads"
  uploadFieldName="asset"
  mapUploadResponse={(response, file, item) => ({
    ...item,
    remoteUrl: response.url,
    previewUrl: response.thumbnailUrl ?? item.previewUrl,
  })}
/>
```

## Notas de ImplementaciÃ³n

- Uses `forwardRef` and `useId` like the rest of the form system.
- Keeps the hidden native file input synchronized for normal form submission flows.
- Automatically infers remote URLs from common response keys like `url`, `fileUrl`, or `location`.


---

# Popover

> A primitive for floating overlays.

## Importation

```tsx
import { Popover } from '@caeher/react-form-tokns';
```

## Description

The `Popover` is a low-level primitive used to build overlays like dropdowns and pickers. It handles positioning relative to a trigger, portal rendering, and automatic repositioning.

## Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `trigger` | `ReactNode` | - | Yes | The element that opens the popover |
| `content` | `(close) => ReactNode`| - | Yes | Function returning content |
| `matchTriggerWidth`| `boolean` | `true` | No | Match trigger width |
| `disabled` | `boolean` | `false` | No | Prevents opening |

## Notas de Implementación

- Uses `Portal` for rendering to avoid z-index and overflow issues.
- Automatically flips position if there's no space below the trigger.
- Closes on click outside by default.


---

# Portal

> A utility for rendering children outside the DOM hierarchy.

## Importation

```tsx
import { Portal } from '@caeher/react-form-tokns';
```

## Description

The `Portal` component uses `ReactDOM.createPortal` to render its children into a different part of the DOM, usually `document.body`. This is essential for components like tooltips and modals.

## Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `children` | `ReactNode` | - | Yes | Content to portal |
| `container`| `HTMLElement` | `document.body`| No | Target container |


---

# Tooltip

> A contextual label shown on hover or focus.

## Importation

```tsx
import { Tooltip } from '@caeher/react-form-tokns';
```

## Description

The `Tooltip` provides short, descriptive text for an element. It appears after a brief delay when the user hovers over or focuses on the trigger element.

## Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `content` | `ReactNode` | - | Yes | Tooltip message |
| `side` | `'top' \| 'bottom' \| 'left' \| 'right'`| `'top'` | No | Preferred side |
| `delay` | `number` | `300` | No | Delay in ms before showing |

## Accesibilidad

- Uses `role="tooltip"`.
- Triggered by both mouse and keyboard focus.


---

# CalendarGrid

> A utility component for rendering date selection grids.

## Importation

```tsx
import { CalendarGrid } from '../components/forms/utils/CalendarGrid';
```

## Description

The `CalendarGrid` is a specialized component used by `CalendarField` and `DatetimeField`. it renders a monthly grid of days, provides month/year selection, and navigation controls.

## API / Props

| Prop | Type | Description |
|---|---|---|
| `viewDate` | `CalendarDate` | The month currently being viewed |
| `onViewDateChange`| `(date) => void` | Callback when month/year changes |
| `selectedDate` | `CalendarDate \| null`| Currently selected date |
| `onDateSelect` | `(date) => void` | Callback when a day is clicked |
| `minDate` | `CalendarDate` | Minimum selectable date |
| `maxDate` | `CalendarDate` | Maximum selectable date |

## Dependencias

- `@internationalized/date`
- `SelectField`
- `lucide-react`


---

# parseDateValue

> Utility for parsing various date formats.

## Importation

```tsx
import { parseDateValue } from '@caeher/react-form-tokns';
```

## Description

A robust utility that attempts to parse unknown inputs into a `@internationalized/date` `CalendarDate` object.

## API

### `parseDateValue(value: unknown): CalendarDate | null`

Supports:
- `CalendarDate` objects (returns as-is)
- Native `Date` objects
- ISO 8601 strings
- Database datetime strings (`YYYY-MM-DD HH:mm:ss`)
- Unix timestamps (numeric strings)
- Standard strings like "YYYY-MM-DD"


---

# parseTimeValue

> Utility for parsing time strings.

## Importation

```tsx
import { parseTimeValue } from '@caeher/react-form-tokns';
```

## Description

Parses various time formats into a structured object representing hours, minutes, and seconds.

## API

### `parseTimeValue(value: unknown): ParsedTime | null`

Returns: `{ hours: number, minutes: number, seconds: number }` or `null`.

Supports:
- "HH:mm"
- "HH:mm:ss"
- "h:mm AM/PM"
- Extraction from full datetime strings


---

# colorConversions

> Collection of color manipulation utilities.

## Importation

```tsx
import { ... } from '../components/forms/utils/colorConversions';
```

## Description

A set of functions to convert between HSV, RGB, HSL, and Hex color formats. Used extensively by the `ColorPickerField`.

## Available Functions

- `hsvToRgb(h, s, v)`
- `rgbToHsv(r, g, b)`
- `rgbToHex(r, g, b)`
- `hexToRgb(hex)`
- `rgbToHsl(r, g, b)`
- `hslToRgb(h, s, l)`
- `formatColor(r, g, b, a, format)`
- `parseColor(value)`


---

