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
