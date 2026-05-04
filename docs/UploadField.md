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
