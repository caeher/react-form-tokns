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
