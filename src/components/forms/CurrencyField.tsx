import {
  useId,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type InputHTMLAttributes,
} from 'react';
import { Landmark } from 'lucide-react';
import {
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldWrapper,
} from '../shared/form';
import {
  fieldControlFixedHeightClass,
  getFieldDividerClass,
  getFieldSurfaceClass,
} from './utils/fieldStyles';

export interface CurrencyFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'defaultValue' | 'onChange' | 'min' | 'max'> {
  label?: string;
  hint?: string;
  error?: string;
  inline?: boolean;
  disabled?: boolean;
  value?: number | null;
  defaultValue?: number | null;
  onChange?: (event: { target: { name: string; value: number | null }; persist: () => void }) => void;
  currency?: string;
  locale?: string;
  min?: number;
  max?: number;
  step?: number;
  allowNegative?: boolean;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

function clampCurrencyValue(value: number | null, min?: number, max?: number) {
  if (value === null) {
    return null;
  }

  let nextValue = value;
  if (min !== undefined) {
    nextValue = Math.max(min, nextValue);
  }
  if (max !== undefined) {
    nextValue = Math.min(max, nextValue);
  }

  return nextValue;
}

function sanitizeCurrencyInput(value: string, allowNegative: boolean, maximumFractionDigits: number) {
  let sanitized = value.replace(/[^\d.,-]/g, '').replace(/,/g, '.');

  if (!allowNegative) {
    sanitized = sanitized.replace(/-/g, '');
  } else {
    sanitized = sanitized.startsWith('-')
      ? `-${sanitized.slice(1).replace(/-/g, '')}`
      : sanitized.replace(/-/g, '');
  }

  const negativePrefix = sanitized.startsWith('-') ? '-' : '';
  const unsignedValue = negativePrefix ? sanitized.slice(1) : sanitized;
  const [integerPart = '', fractionalPart = ''] = unsignedValue.split('.');
  const safeInteger = integerPart.replace(/\./g, '');
  const safeFraction = fractionalPart.replace(/\./g, '').slice(0, maximumFractionDigits);

  return `${negativePrefix}${safeInteger}${unsignedValue.includes('.') ? '.' : ''}${safeFraction}`;
}

function parseCurrencyInput(value: string) {
  if (!value || value === '-' || value === '.' || value === '-.') {
    return null;
  }

  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
}

function formatCurrencyValue(
  value: number | null,
  locale: string,
  currency: string,
  minimumFractionDigits: number,
  maximumFractionDigits: number
) {
  if (value === null) {
    return '';
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
}

function formatEditableValue(value: number | null, maximumFractionDigits: number) {
  if (value === null) {
    return '';
  }

  const asString = value.toFixed(maximumFractionDigits);
  return maximumFractionDigits === 0 ? asString : asString.replace(/\.?0+$/, '');
}

export const CurrencyField = forwardRef<HTMLInputElement, CurrencyFieldProps>(({
  id,
  label,
  hint,
  error,
  inline = false,
  disabled = false,
  className = '',
  value,
  defaultValue = null,
  onChange,
  currency = 'USD',
  locale = 'en-US',
  min,
  max,
  step = 1,
  allowNegative = false,
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
  ...props
}, ref) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const inputRef = useRef<HTMLInputElement>(null);

  const [internalValue, setInternalValue] = useState<number | null>(value ?? defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const [draftValue, setDraftValue] = useState(
    formatEditableValue(value ?? defaultValue, maximumFractionDigits)
  );

  const currentValue = value !== undefined ? value : internalValue;
  const currencyMarker = useMemo(() => {
    const parts = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      currencyDisplay: 'narrowSymbol',
      minimumFractionDigits,
      maximumFractionDigits,
    }).formatToParts(0);

    return parts.find((part) => part.type === 'currency')?.value ?? currency;
  }, [currency, locale, minimumFractionDigits, maximumFractionDigits]);

  useEffect(() => {
    if (value === undefined || isFocused) {
      return;
    }

    setDraftValue(formatEditableValue(value, maximumFractionDigits));
  }, [value, isFocused, maximumFractionDigits]);

  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

  const emitChange = (nextValue: number | null) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onChange?.({
      target: {
        name: props.name || inputId,
        value: nextValue,
      },
      persist: () => {},
    });
  };

  const displayValue = isFocused
    ? draftValue
    : formatCurrencyValue(
        currentValue,
        locale,
        currency,
        minimumFractionDigits,
        maximumFractionDigits
      );

  const adjustValue = (direction: 1 | -1) => {
    if (disabled) {
      return;
    }

    const baseValue = currentValue ?? 0;
    const nextValue = clampCurrencyValue(baseValue + direction * step, min, max);
    setDraftValue(formatEditableValue(nextValue, maximumFractionDigits));
    emitChange(nextValue);
  };

  const currencyContent = (
    <div className={`flex min-w-0 flex-col gap-1.5 ${inline ? 'flex-1' : ''}`}>
      <div
        className={`flex overflow-hidden rounded-xl ${fieldControlFixedHeightClass} ${getFieldSurfaceClass({
          disabled,
          error: !!error,
          focusMode: 'focus-within',
        })}`}
      >
        <div
          className={`flex h-full items-center gap-2 border-r bg-slate-50 dark:bg-slate-900/50 px-3 text-sm ${
            disabled
              ? 'text-slate-400 dark:text-slate-600'
              : 'text-slate-700 dark:text-slate-100'
          } ${getFieldDividerClass({ disabled, error: !!error })}`}
        >
          <Landmark size={16} className={disabled ? 'text-slate-300 dark:text-slate-700' : 'text-slate-400 dark:text-slate-500'} />
          <span className="font-medium">{currencyMarker}</span>
        </div>
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          value={displayValue}
          disabled={disabled}
          inputMode="decimal"
          onFocus={() => {
            setIsFocused(true);
            setDraftValue(formatEditableValue(currentValue, maximumFractionDigits));
          }}
          onBlur={() => {
            setIsFocused(false);
            const parsed = clampCurrencyValue(parseCurrencyInput(draftValue), min, max);
            setDraftValue(formatEditableValue(parsed, maximumFractionDigits));
            emitChange(parsed);
          }}
          onChange={(event) => {
            const sanitized = sanitizeCurrencyInput(
              event.target.value,
              allowNegative,
              maximumFractionDigits
            );
            setDraftValue(sanitized);
            emitChange(clampCurrencyValue(parseCurrencyInput(sanitized), min, max));
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowUp') {
              event.preventDefault();
              adjustValue(1);
            }

            if (event.key === 'ArrowDown') {
              event.preventDefault();
              adjustValue(-1);
            }
          }}
          className={`h-full w-full min-w-0 bg-transparent dark:bg-slate-900/50 px-4 text-sm text-slate-900 dark:text-slate-50 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none ${
            disabled ? 'cursor-not-allowed text-slate-400 dark:text-slate-600' : ''
          }`}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...props}
        />
      </div>

      <input type="hidden" name={props.name || inputId} value={currentValue ?? ''} />

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
      {currencyContent}
    </FieldWrapper>
  );
});

CurrencyField.displayName = 'CurrencyField';
