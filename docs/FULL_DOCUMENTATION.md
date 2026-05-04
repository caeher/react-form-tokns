# Full Documentation

*Generated on 5/2/2026, 5:21:46 PM*

---

# Form Maker Documentation Index

Welcome to the comprehensive documentation for the Form Maker component library.

## Form Components
- [TextField](TextField.md)
- [TextareaField](TextareaField.md)
- [SelectField](SelectField.md)
- [CheckboxField](CheckboxField.md)
- [RadioGroupField](RadioGroupField.md)
- [SwitchField](SwitchField.md)
- [CalendarField](CalendarField.md)
- [ToggleField](ToggleField.md)
- [NumberField](NumberField.md)
- [InputOtpField](InputOtpField.md)
- [ProgressField](ProgressField.md)
- [TimeField](TimeField.md)
- [DatetimeField](DatetimeField.md)
- [ColorPickerField](ColorPickerField.md)

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
