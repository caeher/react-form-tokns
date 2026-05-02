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
