---
name: react-form-tokns
description: Use this skill when Codex needs to build, integrate, refactor, document, or troubleshoot React forms that use the @caeher/react-form-tokns library (Form Maker). Apply it for component selection, controlled form wiring, synthetic versus native event handling, date/time parsing, upload flows, inline layouts, accessibility-preserving integrations, and when extending the library without breaking its shared field conventions.
---

# React Form Tokns

Use this skill to work safely with the public API in `src/lib/index.ts` and the form component catalog exported from `src/components/forms/index.ts`.

## Start Here

1. Decide whether the task is consumer integration or library maintenance.
2. For consumer code, import from `@caeher/react-form-tokns` instead of deep internal paths.
3. For library changes, preserve the shared field architecture already used in `src/components/forms` and `src/components/shared/form`.

## Follow These Rules

- Prefer controlled usage for all custom fields unless the task explicitly calls for `defaultValue`.
- Keep form state keyed by `name` and read values from `event.target`.
- Distinguish native DOM events from the library's synthetic event objects before sharing a generic `handleChange`.
- Keep stored values in the component's canonical output format instead of inventing custom adapters unless the consuming app requires them.
- Preserve accessibility wiring: labels, hint text, error text, disabled state, and keyboard interaction are part of the contract.
- Reuse existing primitives and helpers before creating new field-specific logic.

Read `references/integration-rules.md` before wiring handlers, refactoring forms, or debugging value flow.

## Choose Components Deliberately

- Use plain text controls for standard HTML input behavior.
- Use popover-backed controls when search, richer option rendering, or structured pickers are required.
- Use date/time helpers when incoming values can be ISO strings, database timestamps, or mixed persisted formats.
- Use specialized fields only when their data model matches the product need.

Read `references/component-catalog.md` when choosing the correct field or validating prop usage.

## Preserve Library Conventions When Editing Components

- Keep `forwardRef` on primary form controls.
- Use `useId` for generated ids and ARIA relationships.
- Support the shared surface props whenever the component fits the design system pattern:
  `label`, `hint`, `error`, `disabled`, and `inline`.
- Use `FieldWrapper`, `FieldLabel`, `FieldDescription`, and `FieldError` instead of rebuilding wrapper logic.
- Use field styling helpers from `src/components/forms/utils/fieldStyles.ts` for consistent states and heights.
- When a custom UI replaces a native control, keep a hidden native input/select synchronized if the component already follows that pattern.

## Validate Before Finishing

- Confirm imports come from the package root for consumer-facing code.
- Confirm the value shape matches the selected component.
- Confirm the chosen handler works for booleans, arrays, numbers, strings, and upload payloads as needed.
- Confirm date/time strings are in the exact format the component emits.
- Confirm keyboard and screen-reader behavior still works after changes.
- Run `npm run lint`.
- Run `npm run build`.

## Useful Local Sources

- Public exports: `src/lib/index.ts`
- Form catalog: `src/components/forms/index.ts`
- Live usage examples: `src/App.tsx`
- Broader docs: `docs/FULL_DOCUMENTATION.md`
