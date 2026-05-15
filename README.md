# Form Maker Design System

A high-performance, accessible, and themeable form component library built with React 19, Vite 8, TypeScript 6, and Tailwind CSS v4.

## Overview

Form Maker is an evolution of standard form controls, focusing on deep accessibility (ARIA, focus management), robust data parsing (dates/times), and premium techno-industrial aesthetics. Every component follows a strict architectural pattern ensuring consistency across the entire system.

## Getting Started

### Installation

```bash
npm install @caeher/react-form-tokns
```

### Tailwind CSS Setup

This library is built with **Tailwind CSS v4**. To ensure the library's styles are correctly applied in your project, you must tell Tailwind to scan the package for utility classes.

Add the `@source` directive to your main CSS file (e.g., `app.css` or `index.css`):

```css
@import "tailwindcss";
@source "../node_modules/@caeher/react-form-tokns";
```

### Library Usage

This library follows a **controlled component** pattern. Each field expects a `value` and an `onChange` handler that receives a synthetic event object. This allows for seamless integration with state management libraries or standard React state.

The library also supports **inline layouts** via the `inline` prop, allowing you to switch between vertical and horizontal alignments effortlessly.

## Playground

Put the library into practice with this comprehensive example. Copy and paste this into your project to see the components in action:

```tsx
import { useState } from 'react';
import { 
  TextField, 
  SelectField, 
  CalendarField, 
  SwitchField, 
  PhoneField,
  Mail,
  User
} from '@caeher/react-form-tokns';

export function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: 'developer',
    birthDate: '',
    phone: '',
    newsletter: true
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-8 space-y-6 bg-slate-900 rounded-2xl border border-white/10">
      <h2 className="text-2xl font-bold text-white mb-6">User Registration</h2>
      
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="John Doe"
          icon={User}
          hint="As it appears on your ID"
        />
        
        <TextField
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          icon={Mail}
        />
      </div>

      <SelectField
        label="Primary Role"
        name="role"
        value={formData.role}
        onChange={handleChange}
        options={[
          { label: 'Developer', value: 'developer' },
          { label: 'Designer', value: 'designer' },
          { label: 'Manager', value: 'manager' }
        ]}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <CalendarField
          label="Date of Birth"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
        />
        
        <PhoneField
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <SwitchField
        inline
        label="Subscribe to newsletter"
        name="newsletter"
        checked={formData.newsletter}
        onChange={handleChange}
      />

      <button 
        type="submit"
        className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg transition-colors"
      >
        Complete Registration
      </button>
    </form>
  );
}
```


## Tech Stack

- **Core:** React 19 (Functional Components, Hooks)
- **Language:** TypeScript 6 (Strict Mode)
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS v4 (Vanilla CSS variables, Modern Tokens)
- **Icons:** Lucide React
- **Date/Time:** `@internationalized/date`

## Project Structure

```text
form-maker/
├── .github/workflows/
│   ├── ci.yml              # Lint and Build on PRs
│   └── release.yml         # Semantic Release on Main
├── src/
│   ├── components/
│   │   ├── forms/          # Form-specific components
│   │   │   ├── utils/      # Parsing and math helpers
│   │   │   └── index.ts    # Barrel export for all fields
│   │   └── ui/             # Primitive UI components (overlays, portals)
│   ├── App.tsx             # Interactive preview gallery
│   └── index.css           # Global design tokens and animations
├── .releaserc.json         # Semantic release configuration
└── package.json            # Dependencies and versioning
```

## Development and CI

GitHub Actions runs the same checks as below on every push and pull request to `main` / `master` (see `.github/workflows/ci.yml`).

**Requirements:** Node.js **22** (matches CI).

**Reproduce CI locally** (recommended before pushing):

```bash
npm ci
npm run lint
npm run build
```

`npm ci` installs exactly what is in `package-lock.json`. If you change `package.json`, refresh the lockfile with `npm install` and commit the updated `package-lock.json`; otherwise CI will fail at install time.

## Architecture Conventions

Every component in this library MUST adhere to the following 8 rules:

1. **ForwardRef:** All form fields must wrap their primary input element with `forwardRef` to allow parent access.
2. **Accessibility (useId):** Every field must use the `useId` hook to generate unique IDs for connecting labels, hints, and error messages.
3. **Synthetic Event Model:** Changes are emitted via an `onChange` prop using a synthetic event object: `{ target: { name, value }, persist: () => {} }`.
4. **State Management:** Components should be "controlled" by default, using `value` and `onChange`.
5. **Layout (inline prop):** All fields support an `inline` prop for switching between vertical (standard) and horizontal (aligned) layouts.
6. **Consistent Prop Surface:** Every field includes `label`, `hint`, `error`, and `disabled`.
7. **Tailwind Tokens:** Use Tailwind v4 classes (e.g., `bg-slate-900/50`, `border-white/10`, `text-cyan-400`).
8. **Composition:** Complex fields (Calendar, Datetime) are composed of smaller, reusable primitives located in `utils/`.

---

## Form Component Catalog

### TextField
Standard single-line text input with optional icon integration.
**Import:** `import { TextField } from './components/forms'`

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | - | Floating or aligned label text |
| `hint` | `string` | - | Helpful text shown below the input |
| `error` | `string` | - | Error message that triggers red visual state |
| `icon` | `ElementType` | - | Lucide icon to display |
| `iconPosition`| `'left' \| 'right'`| `'left'` | Placement of the icon |

### SearchField
Dedicated search input with a leading icon, clear action, and optional loading state.
**Import:** `import { SearchField } from './components/forms'`

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | - | Current search query |
| `loading` | `boolean` | `false` | Shows a trailing spinner |
| `clearable` | `boolean` | `true` | Enables the clear button |

### SelectField
A premium custom dropdown replacing the native `<select>`, using a Popover overlay.
**Import:** `import { SelectField } from './components/forms'`

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `SelectOption[]` | `[]` | Array of `{ label, value, icon?, image? }` |
| `placeholder` | `string` | - | Text shown when no value is selected |

### ComboboxField
Searchable single-select field for larger or more descriptive option sets.
**Import:** `import { ComboboxField } from './components/forms'`

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `ComboboxOption[]` | `[]` | Array of searchable options |
| `searchPlaceholder` | `string` | `'Filter options...'` | Placeholder for the filter input |
| `clearable` | `boolean` | `true` | Enables quick selection reset |

### MultiSelectField
Searchable multi-select with chip-style selected values in the trigger.
**Import:** `import { MultiSelectField } from './components/forms'`

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `(string \| number)[]` | `[]` | Current selected values |
| `maxSelections` | `number` | - | Optional selection cap |
| `clearable` | `boolean` | `true` | Enables quick clear-all |

### CalendarField
Date picker using `@internationalized/date`. Supports strings, nulls, and standard DB formats.
**Import:** `import { CalendarField } from './components/forms'`

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | - | Date string in ISO format (`YYYY-MM-DD`) |

### ColorPickerField
Advanced color selection supporting Hex, RGB, HSL, and Alpha transparency.
**Import:** `import { ColorPickerField } from './components/forms'`

| Prop | Type | Default | Description |
|---|---|---|---|
| `format` | `ColorFormat` | `'hex'` | `'hex' \| 'rgb' \| 'hsl' \| 'hex-alpha' \| 'rgba' \| 'hsla'` |
| `presets` | `string[]` | (Default Palette) | Quick-select color swatches |

### UploadField
Professional file uploader with drag-and-drop, image previews, removable items, and optional automatic server upload.
**Import:** `import { UploadField } from './components/forms'`

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `UploadFieldItem[]` | `[]` | Current selected or uploaded files |
| `uploadUrl` | `string` | - | Enables automatic server-side upload |
| `multiple` | `boolean` | `false` | Allows multiple file selection |
| `maxFiles` | `number` | - | Caps how many files can be stored |
| `previewStrategy` | `'auto' \| 'image-only' \| 'none'` | `'auto'` | Controls preview rendering |

### PhoneField
International telephone input with country dial code selection.
**Import:** `import { PhoneField } from './components/forms'`

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | - | Full phone value including dial code |
| `defaultCountry` | `string` | `'US'` | Starting country selection |
| `countries` | `PhoneCountryOption[]` | Built-in list | Custom country presets |

### CurrencyField
Locale-aware currency input with formatted display on blur.
**Import:** `import { CurrencyField } from './components/forms'`

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `number \| null` | - | Numeric currency value |
| `currency` | `string` | `'USD'` | ISO currency code |
| `locale` | `string` | `'en-US'` | Locale used for display formatting |

---

## UI Primitives

### Tooltip
Floating contextual labels.
**Import:** `import { Tooltip } from './components/ui/Tooltip'`

| Prop | Type | Default | Description |
|---|---|---|---|
| `content` | `ReactNode` | - | Content to show in the tooltip |
| `side` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Preferred side for placement |

---

## Release Process

This project uses **Semantic Release** to automate versioning and changelog generation.

### Commit Conventions
Commits must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `fix: ...` -> Patches (0.0.1)
- `feat: ...` -> Features (0.1.0)
- `perf: ...` -> Performance improvements
- `chore: ...` -> Maintenance tasks

On every push to `main`, the `Release` GitHub Action will analyze commits, determine the next version, update `package.json`, generate a `CHANGELOG.md`, and create a GitHub Release.
