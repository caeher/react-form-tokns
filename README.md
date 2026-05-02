# Form Maker Design System

A high-performance, accessible, and themeable form component library built with React 19, Vite 8, TypeScript 6, and Tailwind CSS v4.

## Overview

Form Maker is an evolution of standard form controls, focusing on deep accessibility (ARIA, focus management), robust data parsing (dates/times), and premium techno-industrial aesthetics. Every component follows a strict architectural pattern ensuring consistency across the entire system.

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

### SelectField
A premium custom dropdown replacing the native `<select>`, using a Popover overlay.
**Import:** `import { SelectField } from './components/forms'`

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `SelectOption[]` | `[]` | Array of `{ label, value, icon?, image? }` |
| `placeholder` | `string` | - | Text shown when no value is selected |

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
