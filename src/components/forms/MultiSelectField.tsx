import { useId, forwardRef, useMemo, useState, type ChangeEvent, type ElementType, type ReactNode, type SelectHTMLAttributes } from 'react';
import { Check, ChevronDown, Search, X } from 'lucide-react';
import { Popover } from '../ui/Popover';
import {
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldWrapper,
} from '../shared/form';
import type { ComboboxOption } from './ComboboxField';
import { fieldControlHeightClass, getFieldSurfaceClass } from './utils/fieldStyles';

export interface MultiSelectFieldProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'defaultValue'> {
  label?: string;
  hint?: string;
  error?: string;
  options?: ComboboxOption[];
  inline?: boolean;
  value?: (string | number)[];
  defaultValue?: (string | number)[];
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  maxSelections?: number;
  matchTriggerWidth?: boolean;
  clearable?: boolean;
  disabled?: boolean;
}

function renderMultiOption(option: ComboboxOption, disabled: boolean): ReactNode {
  const Icon = option.icon as ElementType | undefined;

  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5">
        {option.image ? (
          <img src={option.image} alt="" className="h-full w-full rounded-lg object-cover" />
        ) : Icon ? (
          <Icon size={16} className={disabled ? 'text-slate-600' : 'text-slate-300'} />
        ) : (
          <span className={disabled ? 'text-slate-700' : 'text-slate-500'}>#</span>
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

function matchesMultiOption(option: ComboboxOption, query: string) {
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

export const MultiSelectField = forwardRef<HTMLSelectElement, MultiSelectFieldProps>(({
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
  placeholder = 'Select one or more...',
  searchPlaceholder = 'Filter selections...',
  emptyMessage = 'No options available.',
  maxSelections,
  matchTriggerWidth = true,
  clearable = true,
  disabled = false,
  ...props
}, ref) => {
  const generatedId = useId();
  const selectId = id || generatedId;
  const [internalValue, setInternalValue] = useState<(string | number)[]>(value ?? defaultValue ?? []);
  const [query, setQuery] = useState('');

  const currentValue = value !== undefined ? value : internalValue;
  const selectedOptions = options.filter((option) => currentValue.includes(option.value));
  const filteredOptions = useMemo(
    () => options.filter((option) => matchesMultiOption(option, query)),
    [options, query]
  );

  const emitChange = (nextValue: (string | number)[]) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    if (onChange) {
      const event = {
        target: { value: nextValue, name: props.name || selectId },
        currentTarget: { value: nextValue, name: props.name || selectId },
        persist: () => {},
      } as unknown as ChangeEvent<HTMLSelectElement>;

      onChange(event);
    }
  };

  const handleToggle = (optionValue: string | number) => {
    if (disabled) {
      return;
    }

    const isSelected = currentValue.includes(optionValue);
    const canAddMore = maxSelections === undefined || currentValue.length < maxSelections;

    if (!isSelected && !canAddMore) {
      return;
    }

    const nextValue = isSelected
      ? currentValue.filter((valueItem) => valueItem !== optionValue)
      : [...currentValue, optionValue];

    emitChange(nextValue);
  };

  const triggerLabel = selectedOptions.length === 0
    ? ''
    : selectedOptions.length === 1
      ? selectedOptions[0].label
      : `${selectedOptions[0].label} +${selectedOptions.length - 1}`;

  const triggerContent = selectedOptions.length === 0
    ? <span className="truncate text-slate-400">{placeholder}</span>
    : <span className={`truncate ${disabled ? 'text-slate-400' : 'text-slate-100'}`}>{triggerLabel}</span>;

  const multiSelectContent = (
    <div className={`flex flex-col gap-1.5 ${inline ? 'flex-1' : ''}`}>
      <div className="relative" onMouseDown={(event) => event.stopPropagation()}>
        <Popover
          matchTriggerWidth={matchTriggerWidth}
          disabled={disabled}
          trigger={
            <div
              className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm ${
                disabled ? 'text-slate-600' : 'text-slate-100'
              } ${fieldControlHeightClass} ${getFieldSurfaceClass({
                disabled,
                error: !!error,
                focusMode: 'group-focus',
              })}`}
            >
              <div className="min-w-0 flex-1">{triggerContent}</div>
              <div className="ml-3 flex shrink-0 items-center gap-2">
                {clearable && currentValue.length > 0 && !disabled && (
                  <span
                    className="rounded-full p-1 text-slate-500 transition-colors hover:bg-white/5 hover:text-slate-200"
                    onClick={(event) => {
                      event.stopPropagation();
                      emitChange([]);
                    }}
                    role="button"
                    aria-label="Clear selections"
                  >
                    <X size={14} />
                  </span>
                )}
                <ChevronDown size={16} className={disabled ? 'text-slate-700' : 'text-slate-400'} />
              </div>
            </div>
          }
          content={() => (
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
                    className={`w-full rounded-lg py-2 pl-9 pr-3 text-sm text-slate-100 placeholder:text-slate-500 ${getFieldSurfaceClass({})}`}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                  <span>{selectedOptions.length} selected</span>
                  {maxSelections !== undefined && <span>Max {maxSelections}</span>}
                </div>
              </div>
              <div className="max-h-60 overflow-y-auto py-2 custom-scrollbar">
                {filteredOptions.map((option) => {
                  const isSelected = currentValue.includes(option.value);
                  const isAtLimit =
                    !isSelected && maxSelections !== undefined && currentValue.length >= maxSelections;

                  return (
                    <button
                      key={String(option.value)}
                      type="button"
                      className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-left transition-colors ${
                        isSelected
                          ? 'bg-cyan-500/15 text-cyan-300'
                          : isAtLimit
                            ? 'cursor-not-allowed text-slate-600'
                            : 'text-slate-300 hover:bg-white/5 hover:text-slate-50'
                      }`}
                      onClick={() => handleToggle(option.value)}
                      disabled={isAtLimit}
                    >
                      <div className="min-w-0 flex-1">{renderMultiOption(option, disabled)}</div>
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded border ${
                          isSelected
                            ? 'border-cyan-400 bg-cyan-400/20 text-cyan-300'
                            : 'border-white/10 text-transparent'
                        }`}
                      >
                        <Check size={14} />
                      </span>
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
          id={selectId}
          multiple
          value={currentValue.map((valueItem) => String(valueItem))}
          disabled={disabled}
          onChange={() => {}}
          className="sr-only"
          aria-invalid={!!error}
          aria-describedby={error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined}
          {...props}
        >
          {options.map((option) => (
            <option key={String(option.value)} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <FieldDescription id={`${selectId}-hint`} disabled={disabled} hidden={!!error}>
        {hint}
      </FieldDescription>
      <FieldError id={`${selectId}-error`}>{error}</FieldError>
    </div>
  );

  return (
    <FieldWrapper inline={inline} disabled={disabled} className={className}>
      <FieldLabel htmlFor={selectId} inline={inline} disabled={disabled}>
        {label}
      </FieldLabel>
      {multiSelectContent}
    </FieldWrapper>
  );
});

MultiSelectField.displayName = 'MultiSelectField';
