import {
  useId,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  type ChangeEvent,
  type ElementType,
  type InputHTMLAttributes,
} from 'react';
import { Loader2, Search, X } from 'lucide-react';
import {
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldWrapper,
} from '../shared/form';
import { fieldControlHeightClass, getFieldSurfaceClass } from './utils/fieldStyles';

export interface SearchFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'defaultValue' | 'onChange'> {
  label?: string;
  hint?: string;
  error?: string;
  inline?: boolean;
  icon?: ElementType;
  disabled?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  clearable?: boolean;
  onClear?: () => void;
  loading?: boolean;
}

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(({
  id,
  label,
  hint,
  error,
  inline = false,
  icon: Icon = Search,
  disabled = false,
  value,
  defaultValue = '',
  onChange,
  clearable = true,
  onClear,
  loading = false,
  className = '',
  placeholder = 'Search...',
  ...props
}, ref) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const inputRef = useRef<HTMLInputElement>(null);
  const [internalValue, setInternalValue] = useState(value ?? defaultValue);

  const currentValue = value !== undefined ? value : internalValue;

  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

  const emitChange = (nextValue: string) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    if (onChange) {
      const event = {
        target: { value: nextValue, name: props.name || inputId },
        currentTarget: { value: nextValue, name: props.name || inputId },
        persist: () => {},
      } as unknown as ChangeEvent<HTMLInputElement>;

      onChange(event);
    }
  };

  const hasValue = currentValue.trim().length > 0;

  const searchContent = (
    <div className={`flex flex-col gap-1.5 ${inline ? 'flex-1' : ''}`}>
      <div className="relative">
        <div className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${disabled ? 'text-slate-600' : 'text-slate-400'}`}>
          <Icon size={18} />
        </div>
        <input
          ref={inputRef}
          id={inputId}
          type="search"
          value={currentValue}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(event) => {
            if (value === undefined) {
              setInternalValue(event.target.value);
            }
            onChange?.(event);
          }}
          className={`w-full rounded-xl py-2.5 pl-10 pr-11 text-sm text-slate-50 placeholder:text-slate-500 ${fieldControlHeightClass} ${getFieldSurfaceClass({
            disabled,
            error: !!error,
          })}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...props}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {loading ? (
            <Loader2 size={16} className="animate-spin text-cyan-400" />
          ) : clearable && hasValue && !disabled ? (
            <button
              type="button"
              onClick={() => {
                emitChange('');
                onClear?.();
                inputRef.current?.focus();
              }}
              className="rounded-full p-1 text-slate-500 transition-colors hover:bg-white/5 hover:text-slate-200"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          ) : null}
        </div>
      </div>
      <FieldDescription id={`${inputId}-hint`} disabled={disabled} hidden={!!error}>
        {hint}
      </FieldDescription>
      <FieldError id={`${inputId}-error`}>{error}</FieldError>
    </div>
  );

  return (
    <FieldWrapper inline={inline} disabled={disabled} className={className}>
      <FieldLabel htmlFor={inputId} inline={inline} disabled={disabled}>
        {label}
      </FieldLabel>
      {searchContent}
    </FieldWrapper>
  );
});

SearchField.displayName = 'SearchField';
