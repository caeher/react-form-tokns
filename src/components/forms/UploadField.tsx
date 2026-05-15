import {
  forwardRef,
  InputHTMLAttributes,
  KeyboardEvent,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  CircleAlert,
  CircleCheck,
  CloudUpload,
  FileArchive,
  FileImage,
  FileText,
  FileVideoCamera,
  LoaderCircle,
  Music4,
  Server,
  Trash2,
  Upload,
} from 'lucide-react';
import {
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldWrapper,
} from '../shared/form';
import { getFieldSurfaceClass } from './utils/fieldStyles';

export type UploadFieldStatus = 'idle' | 'uploading' | 'uploaded' | 'error';

export interface UploadFieldItem {
  id: string;
  name: string;
  size: number;
  type: string;
  status: UploadFieldStatus;
  file?: File;
  previewUrl?: string;
  remoteUrl?: string;
  response?: unknown;
  error?: string;
}

export interface UploadFieldChangeEvent {
  target: {
    name: string;
    value: UploadFieldItem[];
    files: File[];
    uploaded: boolean;
  };
  persist: () => void;
}

export interface UploadFieldProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'type' | 'value' | 'defaultValue' | 'onChange'
  > {
  label?: string;
  hint?: string;
  error?: string;
  inline?: boolean;
  disabled?: boolean;
  value?: UploadFieldItem[];
  defaultValue?: UploadFieldItem[];
  onChange?: (event: UploadFieldChangeEvent) => void;
  uploadUrl?: string;
  uploadMethod?: 'POST' | 'PUT' | 'PATCH';
  uploadHeaders?: Record<string, string>;
  uploadFieldName?: string;
  uploadData?: Record<string, string | Blob>;
  uploadRequestInit?: Omit<RequestInit, 'method' | 'body' | 'headers'>;
  mapUploadResponse?: (
    response: unknown,
    file: File,
    item: UploadFieldItem
  ) => Partial<UploadFieldItem>;
  onUploadComplete?: (items: UploadFieldItem[]) => void;
  onUploadError?: (item: UploadFieldItem, error: Error) => void;
  maxFiles?: number;
  previewStrategy?: 'auto' | 'image-only' | 'none';
  showFileSize?: boolean;
  removable?: boolean;
}

const createItemId = () =>
  `upload-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const formatBytes = (bytes: number) => {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** exponent;
  return `${value >= 10 || exponent === 0 ? value.toFixed(0) : value.toFixed(1)} ${units[exponent]}`;
};

const truncateFileName = (fileName: string, maxLength = 32) => {
  if (fileName.length <= maxLength) return fileName;

  const extensionIndex = fileName.lastIndexOf('.');
  const hasExtension = extensionIndex > 0 && extensionIndex < fileName.length - 1;

  if (!hasExtension) {
    return `${fileName.substring(0, Math.max(maxLength - 3, 1))}...`;
  }

  const extension = fileName.substring(extensionIndex);
  const baseName = fileName.substring(0, extensionIndex);
  const availableBaseLength = maxLength - extension.length - 3;

  if (availableBaseLength <= 0) {
    return `${fileName.substring(0, Math.max(maxLength - 3, 1))}...`;
  }

  return `${baseName.substring(0, availableBaseLength)}...${extension}`;
};

const isImageFile = (type: string) => type.startsWith('image/');
const isVideoFile = (type: string) => type.startsWith('video/');
const isAudioFile = (type: string) => type.startsWith('audio/');

const shouldCreatePreview = (
  type: string,
  previewStrategy: UploadFieldProps['previewStrategy']
) => {
  if (previewStrategy === 'none') return false;
  if (previewStrategy === 'image-only') return isImageFile(type);
  return isImageFile(type);
};

const getRemoteUrlFromResponse = (response: unknown): string | undefined => {
  if (!response || typeof response !== 'object') return undefined;

  const candidates = ['url', 'secure_url', 'fileUrl', 'file_url', 'location', 'href', 'src'];

  for (const key of candidates) {
    const value = (response as Record<string, unknown>)[key];
    if (typeof value === 'string' && value.length > 0) {
      return value;
    }
  }

  for (const value of Object.values(response as Record<string, unknown>)) {
    const nested = getRemoteUrlFromResponse(value);
    if (nested) return nested;
  }

  return undefined;
};

const parseUploadResponse = async (response: Response) => {
  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    return response.json();
  }

  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

const getUploadErrorMessage = (response: unknown, status: number) => {
  if (typeof response === 'string' && response.trim()) return response;
  if (response && typeof response === 'object') {
    const object = response as Record<string, unknown>;
    if (typeof object.message === 'string') return object.message;
    if (typeof object.error === 'string') return object.error;
  }
  return `Upload failed with status ${status}.`;
};

const getFileIcon = (type: string) => {
  if (isImageFile(type)) return FileImage;
  if (isVideoFile(type)) return FileVideoCamera;
  if (isAudioFile(type)) return Music4;
  if (
    type.includes('zip') ||
    type.includes('compressed') ||
    type.includes('tar') ||
    type.includes('rar')
  ) {
    return FileArchive;
  }
  return FileText;
};

export const UploadField = forwardRef<HTMLInputElement, UploadFieldProps>(({
  id,
  name,
  label,
  hint,
  error,
  inline = false,
  disabled = false,
  className = '',
  value,
  defaultValue,
  onChange,
  uploadUrl,
  uploadMethod = 'POST',
  uploadHeaders,
  uploadFieldName = 'file',
  uploadData,
  uploadRequestInit,
  mapUploadResponse,
  onUploadComplete,
  onUploadError,
  multiple = false,
  maxFiles,
  previewStrategy = 'auto',
  showFileSize = true,
  removable = true,
  accept,
  ...props
}, ref) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const fieldName = name || inputId;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const objectUrlsRef = useRef<Map<string, string>>(new Map());
  const itemsRef = useRef<UploadFieldItem[]>(value ?? defaultValue ?? []);
  const [internalItems, setInternalItems] = useState<UploadFieldItem[]>(value ?? defaultValue ?? []);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (value !== undefined) {
      setInternalItems(value);
    }
  }, [value]);

  useEffect(() => {
    itemsRef.current = internalItems;
    revokeRemovedPreviews(internalItems);
  }, [internalItems]);

  useEffect(() => () => {
    objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    objectUrlsRef.current.clear();
  }, []);

  const setRefs = (node: HTMLInputElement | null) => {
    inputRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
      return;
    }
    if (ref) {
      ref.current = node;
    }
  };

  const syncNativeInputFiles = (items: UploadFieldItem[]) => {
    if (!inputRef.current || typeof DataTransfer === 'undefined') return;

    const transfer = new DataTransfer();
    items.forEach((item) => {
      if (item.file) {
        transfer.items.add(item.file);
      }
    });

    inputRef.current.files = transfer.files;
  };

  const emitChange = (nextItems: UploadFieldItem[]) => {
    syncNativeInputFiles(nextItems);
    onChange?.({
      target: {
        name: fieldName,
        value: nextItems,
        files: nextItems.flatMap((item) => (item.file ? [item.file] : [])),
        uploaded: nextItems.some((item) => item.status === 'uploaded'),
      },
      persist: () => {},
    });
  };

  const commitItems = (nextItems: UploadFieldItem[]) => {
    itemsRef.current = nextItems;
    setInternalItems(nextItems);
    emitChange(nextItems);
  };

  const revokeRemovedPreviews = (nextItems: UploadFieldItem[]) => {
    const nextIds = new Set(nextItems.map((item) => item.id));
    objectUrlsRef.current.forEach((url, itemId) => {
      if (!nextIds.has(itemId)) {
        URL.revokeObjectURL(url);
        objectUrlsRef.current.delete(itemId);
      }
    });
  };

  const updateItem = (itemId: string, updater: (item: UploadFieldItem) => UploadFieldItem) => {
    setInternalItems((current) => {
      const next = current.map((item) => (item.id === itemId ? updater(item) : item));
      itemsRef.current = next;
      emitChange(next);
      return next;
    });
  };

  const removeItem = (itemId: string) => {
    const nextItems = internalItems.filter((item) => item.id !== itemId);
    revokeRemovedPreviews(nextItems);
    commitItems(nextItems);
  };

  const uploadItems = async (itemsToUpload: UploadFieldItem[]) => {
    if (!uploadUrl || itemsToUpload.length === 0) return;

    await Promise.all(
      itemsToUpload.map(async (item) => {
        if (!item.file) return;

        try {
          const formData = new FormData();
          formData.append(uploadFieldName, item.file, item.file.name);

          if (uploadData) {
            Object.entries(uploadData).forEach(([key, value]) => {
              formData.append(key, value);
            });
          }

          const response = await fetch(uploadUrl, {
            ...uploadRequestInit,
            method: uploadMethod,
            headers: uploadHeaders,
            body: formData,
          });

          const payload = await parseUploadResponse(response);

          if (!response.ok) {
            throw new Error(getUploadErrorMessage(payload, response.status));
          }

          const mapped = mapUploadResponse?.(payload, item.file, item) ?? {};
          const remoteUrl = mapped.remoteUrl ?? getRemoteUrlFromResponse(payload);
          const previewUrl = mapped.previewUrl
            ?? item.previewUrl
            ?? (remoteUrl && shouldCreatePreview(item.type, previewStrategy) ? remoteUrl : undefined);

          updateItem(item.id, (current) => ({
            ...current,
            ...mapped,
            remoteUrl,
            previewUrl,
            response: payload,
            status: 'uploaded',
            error: undefined,
          }));
        } catch (caught) {
          const uploadError = caught instanceof Error ? caught : new Error('Upload failed.');
          updateItem(item.id, (current) => ({
            ...current,
            status: 'error',
            error: uploadError.message,
          }));
          onUploadError?.(item, uploadError);
        }
      })
    );

    onUploadComplete?.(itemsRef.current);
  };

  const canAddMore = useMemo(() => {
    if (!multiple) return true;
    if (maxFiles === undefined) return true;
    return internalItems.length < maxFiles;
  }, [internalItems.length, maxFiles, multiple]);

  const processFiles = async (incomingFiles: File[]) => {
    if (disabled || incomingFiles.length === 0) return;

    const existingItems = multiple ? internalItems : [];
    const availableSlots = multiple
      ? maxFiles === undefined
        ? incomingFiles.length
        : Math.max(maxFiles - existingItems.length, 0)
      : 1;

    const selectedFiles = incomingFiles.slice(0, availableSlots);
    if (selectedFiles.length === 0) return;

    const nextItems = selectedFiles.map<UploadFieldItem>((file) => {
      const item: UploadFieldItem = {
        id: createItemId(),
        name: file.name,
        size: file.size,
        type: file.type,
        status: uploadUrl ? 'uploading' : 'idle',
        file,
      };

      if (shouldCreatePreview(file.type, previewStrategy)) {
        const objectUrl = URL.createObjectURL(file);
        objectUrlsRef.current.set(item.id, objectUrl);
        item.previewUrl = objectUrl;
      }

      return item;
    });

    const mergedItems = multiple ? [...existingItems, ...nextItems] : nextItems;
    revokeRemovedPreviews(mergedItems);
    commitItems(mergedItems);

    if (uploadUrl) {
      await uploadItems(nextItems);
    }
  };

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    await processFiles(files);
    event.target.value = '';
  };

  const handleKeyboardOpen = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!disabled && canAddMore) {
        inputRef.current?.click();
      }
    }
  };

  const isServerMode = Boolean(uploadUrl);
  const selectionLabel = multiple ? 'Select files' : 'Select file';
  const helperLabel = accept ? `Accepted: ${accept}` : 'Any file type';

  const inputContent = (
    <div className={`flex flex-col gap-1.5 ${inline ? 'flex-1' : ''}`}>
      <input
        {...props}
        ref={setRefs}
        id={inputId}
        name={name}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        className="sr-only"
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        onChange={handleInputChange}
      />

      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-controls={inputId}
        aria-disabled={disabled}
        onClick={() => {
          if (!disabled && canAddMore) {
            inputRef.current?.click();
          }
        }}
        onKeyDown={handleKeyboardOpen}
        onDragOver={(event) => {
          event.preventDefault();
          if (!disabled && canAddMore) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={async (event) => {
          event.preventDefault();
          setIsDragging(false);
          await processFiles(Array.from(event.dataTransfer.files ?? []));
        }}
        className={`group relative overflow-hidden rounded-2xl border-dashed px-5 py-5 ${getFieldSurfaceClass({
          disabled,
          error: !!error,
        })} ${
          isDragging && !disabled && !error
            ? 'border-cyan-500 dark:border-cyan-400 bg-cyan-500/5 dark:bg-cyan-500/10 shadow-[0_0_0_1px_rgba(34,211,238,0.2)] focus:border-cyan-500 dark:focus:border-cyan-400'
            : disabled
              ? 'bg-slate-100 dark:bg-slate-900/30 opacity-50'
              : error
                ? 'bg-red-500/5'
                : 'hover:bg-slate-50 dark:hover:bg-slate-900/70'
        }`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/5 to-transparent" />
        <div className="relative flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3 min-w-0">
              <div className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${
                disabled
                  ? 'border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-900/40 text-slate-400 dark:text-slate-600'
                  : error
                    ? 'border-red-500/20 dark:border-red-500/30 bg-red-500/5 dark:bg-red-500/10 text-red-500 dark:text-red-300'
                    : 'border-cyan-500/20 dark:border-cyan-400/20 bg-cyan-500/5 dark:bg-cyan-400/10 text-cyan-600 dark:text-cyan-300'
              }`}>
                {isServerMode ? <CloudUpload size={20} /> : <Upload size={20} />}
              </div>
              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className={`text-sm font-medium ${disabled ? 'text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-slate-100'}`}>
                    Drop files here or browse
                  </p>
                  {isServerMode && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-cyan-500/20 dark:border-cyan-400/20 bg-cyan-500/5 dark:bg-cyan-400/10 px-2 py-0.5 text-[11px] font-medium text-cyan-600 dark:text-cyan-300">
                      <Server size={12} />
                      Auto upload
                    </span>
                  )}
                </div>
                <p className="text-xs leading-5 text-slate-400">
                  {helperLabel}
                  {maxFiles ? ` · Up to ${maxFiles} file${maxFiles > 1 ? 's' : ''}` : ''}
                </p>
              </div>
            </div>

            <button
              type="button"
              disabled={disabled || !canAddMore}
              onClick={(event) => {
                event.stopPropagation();
                inputRef.current?.click();
              }}
              className={`inline-flex w-full items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-colors sm:w-auto ${
                disabled || !canAddMore
                  ? 'cursor-not-allowed border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-900/30 text-slate-400 dark:text-slate-600'
                  : 'border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-700 dark:text-slate-100 hover:border-cyan-500/30 dark:hover:border-cyan-400/30 hover:bg-cyan-500/5 dark:hover:bg-cyan-400/10 hover:text-cyan-600 dark:hover:text-cyan-200'
              }`}
            >
              <Upload size={16} />
              {selectionLabel}
            </button>
          </div>

          {internalItems.length > 0 ? (
            <div className="grid gap-3">
              {internalItems.map((item) => {
                const StatusIcon =
                  item.status === 'uploading'
                    ? LoaderCircle
                    : item.status === 'uploaded'
                      ? CircleCheck
                      : item.status === 'error'
                        ? CircleAlert
                        : null;
                const FileIcon = getFileIcon(item.type);
                const displayName = truncateFileName(item.name);

                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 dark:border-white/8 bg-slate-50/50 dark:bg-slate-950/50 p-3"
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5">
                      {item.previewUrl && shouldCreatePreview(item.type, previewStrategy) ? (
                        <img
                          src={item.previewUrl}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <FileIcon size={22} className="text-slate-300" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100" title={item.name}>
                          {displayName}
                        </p>
                        {StatusIcon && (
                          <StatusIcon
                            size={16}
                            className={`shrink-0 ${
                              item.status === 'uploading'
                                ? 'animate-spin text-cyan-600 dark:text-cyan-300'
                                : item.status === 'uploaded'
                                  ? 'text-emerald-600 dark:text-emerald-300'
                                  : 'text-red-600 dark:text-red-300'
                            }`}
                          />
                        )}
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                        {showFileSize && <span>{formatBytes(item.size)}</span>}
                        {item.type && <span>{item.type}</span>}
                        {!item.type && <span>Unknown format</span>}
                        {item.remoteUrl && (
                          <a
                            href={item.remoteUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-cyan-600 dark:text-cyan-300 transition-colors hover:text-cyan-700 dark:hover:text-cyan-200"
                            onClick={(event) => event.stopPropagation()}
                          >
                            Open file
                          </a>
                        )}
                      </div>
                      {item.error && (
                        <p className="mt-1 text-xs font-medium text-red-600 dark:text-red-300">{item.error}</p>
                      )}
                    </div>

                    {removable && (
                      <button
                        type="button"
                        disabled={disabled}
                        onClick={(event) => {
                          event.stopPropagation();
                          removeItem(item.id);
                        }}
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                          disabled
                            ? 'cursor-not-allowed border-slate-200 dark:border-white/5 text-slate-300 dark:text-slate-600'
                            : 'border-slate-200 dark:border-white/10 text-slate-400 hover:border-red-500/30 dark:hover:border-red-400/30 hover:bg-red-500/5 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-300'
                        }`}
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 dark:border-white/8 bg-slate-50 dark:bg-slate-950/35 px-4 py-3 text-sm text-slate-500 dark:text-slate-400">
              <FileImage size={18} className="text-slate-400 dark:text-slate-500" />
              <span>Selected files will appear here with preview and upload status.</span>
            </div>
          )}
        </div>
      </div>

      <FieldDescription id={`${inputId}-hint`} disabled={disabled} hidden={!!error}>
        {hint}
      </FieldDescription>
      <FieldError id={`${inputId}-error`}>{error}</FieldError>
    </div>
  );

  return (
    <FieldWrapper
      inline={inline}
      disabled={disabled}
      className={className}
      disabledClassName="cursor-not-allowed"
    >
      <FieldLabel htmlFor={inputId} inline={inline} disabled={disabled}>
        {label}
      </FieldLabel>
      {inputContent}
    </FieldWrapper>
  );
});

UploadField.displayName = 'UploadField';
