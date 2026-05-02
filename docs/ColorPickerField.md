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
