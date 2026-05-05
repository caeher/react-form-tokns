import { useId, forwardRef, useMemo, useState, type ChangeEvent, type ElementType, type ReactNode, type SelectHTMLAttributes } from 'react';
import { Check, ChevronDown, Search, X } from 'lucide-react';
import { Popover } from '../ui/Popover';
import {
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldWrapper,
} from '../shared/form';
import type { SelectOption } from './SelectField';

export interface ComboboxOption extends SelectOption {
  description?: string;
  keywords?: string[];
}

export interface ComboboxFieldProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'defaultValue' | 'multiple'> {
  label?: string;
  hint?: string;
  error?: string;
  options?: ComboboxOption[];
  inline?: boolean;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  matchTriggerWidth?: boolean;
  clearable?: boolean;
  disabled?: boolean;
}

function matchesOption(option: ComboboxOption, query: string) {
  if (!query) {
    return true;
  }

  const haystack = [
    option.label,
    option.description,
    String(option.value),
    ...(option.keywords ?? []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return haystack.includes(query.toLowerCase());
}

function renderOption(option: ComboboxOption, disabled: boolean): ReactNode {
  const Icon = option.icon as ElementType | undefined;

  return (
    <div className="flex min-w-0 items-start gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5">
        {option.image ? (
          <img src={option.image} alt="" className="h-full w-full rounded-lg object-cover" />
        ) : Icon ? (
          <Icon size={16} className={disabled ? 'text-slate-600' : 'text-slate-300'} />
        ) : (
          <Search size={16} className={disabled ? 'text-slate-700' : 'text-slate-500'} />
        )}
      </div>
      <div className="min-w-0">
        <p className={`truncate text-sm font-medium ${disabled ? 'text-slate-500' : 'text-slate-100'}`}>
          {option.label}
        </p>
        {option.description && (
          <p className="truncate text-xs text-slate-400">{option.description}</p>
        )}
      </div>
    </div>
  );
}

export const ComboboxField = forwardRef<HTMLSelectElement, ComboboxFieldProps>(({
  id,
  label,
  hint,
  error,
  options = [],
  inline = false,
  value,
  defaultValue,
  onChange,
  className = '',
  placeholder = 'Search and select...',
  searchPlaceholder = 'Filter options...',
  emptyMessage = 'No matches found.',
  matchTriggerWidth = true,
  clearable = true,
  disabled = false,
  ...props
}, ref) => {
  const generatedId = useId();
  const comboboxId = id || generatedId;
  const [internalValue, setInternalValue] = useState<string | number>(value ?? defaultValue ?? '');
  const [query, setQuery] = useState('');

  const currentValue = value !== undefined ? value : internalValue;
  const selectedOption = options.find((option) => option.value === currentValue);
  const filteredOptions = useMemo(
    () => options.filter((option) => matchesOption(option, query)),
    [options, query]
  );

  const emitChange = (nextValue: string | number) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    if (onChange) {
      const event = {
        target: { value: nextValue, name: props.name || comboboxId },
        currentTarget: { value: nextValue, name: props.name || comboboxId },
        persist: () => {},
      } as unknown as ChangeEvent<HTMLSelectElement>;

      onChange(event);
    }
  };

  const handleSelect = (nextValue: string | number) => {
    if (disabled) {
      return;
    }

    emitChange(nextValue);
    setQuery('');
  };

  const comboboxContent = (
    <div className={`flex flex-col gap-1.5 ${inline ? 'flex-1' : ''}`}>
      <div className="relative" onMouseDown={(event) => event.stopPropagation()}>
        <Popover
          matchTriggerWidth={matchTriggerWidth}
          disabled={disabled}
          trigger={
            <div
              className={`flex w-full items-center justify-between rounded-xl border bg-slate-900/50 px-4 py-2.5 text-left text-sm transition-all ${
                disabled
                  ? 'cursor-not-allowed border-white/5 text-slate-600'
                  : error
                    ? 'border-red-500/50 text-slate-100 hover:border-red-500'
                    : 'border-white/10 text-slate-100 hover:border-white/20'
              }`}
            >
              <div className="min-w-0 flex-1">
                {selectedOption ? (
                  renderOption(selectedOption, disabled)
                ) : (
                  <span className="truncate text-slate-400">{placeholder}</span>
                )}
              </div>
              <div className="ml-3 flex shrink-0 items-center gap-2">
                {clearable && currentValue !== '' && !disabled && (
                  <span
                    className="rounded-full p-1 text-slate-500 transition-colors hover:bg-white/5 hover:text-slate-200"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleSelect('');
                    }}
                    role="button"
                    aria-label="Clear selection"
                  >
                    <X size={14} />
                  </span>
                )}
                <ChevronDown size={16} className={disabled ? 'text-slate-700' : 'text-slate-400'} />
              </div>
            </div>
          }
          content={(close) => (
            <div className="max-h-80 overflow-hidden">
              <div className="border-b border-white/10 p-3">
                <div className="relative">
                  <Search
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={searchPlaceholder}
                    className="w-full rounded-lg border border-white/10 bg-slate-950/70 py-2 pl-9 pr-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>
              <div className="max-h-60 overflow-y-auto py-2 custom-scrollbar">
                {filteredOptions.map((option) => {
                  const isSelected = option.value === currentValue;

                  return (
                    <button
                      key={String(option.value)}
                      type="button"
                      className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-left transition-colors ${
                        isSelected
                          ? 'bg-cyan-500/15 text-cyan-300'
                          : 'text-slate-300 hover:bg-white/5 hover:text-slate-50'
                      }`}
                      onClick={() => {
                        handleSelect(option.value);
                        close();
                      }}
                    >
                      <div className="min-w-0 flex-1">{renderOption(option, disabled)}</div>
                      <Check size={16} className={isSelected ? 'opacity-100' : 'opacity-0'} />
                    </button>
                  );
                })}
                {filteredOptions.length === 0 && (
                  <div className="px-4 py-3 text-sm text-slate-500">{emptyMessage}</div>
                )}
              </div>
            </div>
          )}
        />

        <select
          ref={ref}
          id={comboboxId}
          value={currentValue}
          disabled={disabled}
          onChange={(event) => handleSelect(event.target.value)}
          className="sr-only"
          aria-invalid={!!error}
          aria-describedby={error ? `${comboboxId}-error` : hint ? `${comboboxId}-hint` : undefined}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={String(option.value)} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <FieldDescription id={`${comboboxId}-hint`} disabled={disabled} hidden={!!error}>
        {hint}
      </FieldDescription>
      <FieldError id={`${comboboxId}-error`}>{error}</FieldError>
    </div>
  );

  return (
    <FieldWrapper inline={inline} disabled={disabled} className={className}>
      <FieldLabel htmlFor={comboboxId} inline={inline} disabled={disabled}>
        {label}
      </FieldLabel>
      {comboboxContent}
    </FieldWrapper>
  );
});

ComboboxField.displayName = 'ComboboxField';
