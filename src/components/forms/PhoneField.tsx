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
import { ChevronDown, Phone, Search } from 'lucide-react';
import { Popover } from '../ui/Popover';
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

export interface PhoneCountryOption {
  code: string;
  label: string;
  dialCode: string;
  format?: number[];
  placeholder?: string;
}

export interface PhoneFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'defaultValue' | 'onChange'> {
  label?: string;
  hint?: string;
  error?: string;
  inline?: boolean;
  disabled?: boolean;
  value?: string;
  defaultValue?: string;
  country?: string;
  defaultCountry?: string;
  countries?: PhoneCountryOption[];
  onChange?: (event: { target: { name: string; value: string }; persist: () => void }) => void;
  onCountryChange?: (country: PhoneCountryOption) => void;
  countrySearchPlaceholder?: string;
}

const DEFAULT_PHONE_COUNTRIES: PhoneCountryOption[] = [
  { code: 'US', label: 'United States', dialCode: '+1', format: [3, 3, 4], placeholder: '(555) 867-5309' },
  { code: 'CA', label: 'Canada', dialCode: '+1', format: [3, 3, 4], placeholder: '(604) 555-0199' },
  { code: 'MX', label: 'Mexico', dialCode: '+52', format: [2, 4, 4], placeholder: '55 1234 5678' },
  { code: 'SV', label: 'El Salvador', dialCode: '+503', format: [4, 4], placeholder: '7012 3456' },
  { code: 'GB', label: 'United Kingdom', dialCode: '+44', format: [4, 3, 4], placeholder: '0791 234 5678' },
  { code: 'ES', label: 'Spain', dialCode: '+34', format: [3, 3, 3], placeholder: '612 345 678' },
  { code: 'FR', label: 'France', dialCode: '+33', format: [1, 2, 2, 2, 2], placeholder: '6 12 34 56 78' },
  { code: 'DE', label: 'Germany', dialCode: '+49', format: [3, 3, 4], placeholder: '151 234 5678' },
];

function countryCodeDigits(country: PhoneCountryOption) {
  return country.dialCode.replace(/\D/g, '');
}

function formatPhoneDigits(digits: string, groups?: number[]) {
  if (!digits) {
    return '';
  }

  if (!groups || groups.length === 0) {
    return digits;
  }

  const parts: string[] = [];
  let cursor = 0;

  for (const group of groups) {
    const slice = digits.slice(cursor, cursor + group);
    if (!slice) {
      break;
    }
    parts.push(slice);
    cursor += group;
  }

  if (cursor < digits.length) {
    parts.push(digits.slice(cursor));
  }

  return parts.join(' ');
}

function resolveCountry(
  countries: PhoneCountryOption[],
  code: string | undefined,
  fallbackCode: string | undefined
) {
  return (
    countries.find((country) => country.code === code) ??
    countries.find((country) => country.code === fallbackCode) ??
    countries[0]
  );
}

function parsePhoneValue(
  rawValue: string,
  countries: PhoneCountryOption[],
  fallbackCountry: PhoneCountryOption
) {
  const digits = rawValue.replace(/\D/g, '');
  const matchedCountry = [...countries]
    .sort((left, right) => countryCodeDigits(right).length - countryCodeDigits(left).length)
    .find((country) => digits.startsWith(countryCodeDigits(country)));

  if (!matchedCountry) {
    return {
      country: fallbackCountry,
      nationalDigits: digits,
    };
  }

  return {
    country: matchedCountry,
    nationalDigits: digits.slice(countryCodeDigits(matchedCountry).length),
  };
}

function buildPhoneValue(country: PhoneCountryOption, nationalDigits: string) {
  if (!nationalDigits) {
    return '';
  }

  return `${country.dialCode} ${formatPhoneDigits(nationalDigits, country.format)}`;
}

export const PhoneField = forwardRef<HTMLInputElement, PhoneFieldProps>(({
  id,
  label,
  hint,
  error,
  inline = false,
  disabled = false,
  className = '',
  value,
  defaultValue,
  country,
  defaultCountry = 'US',
  countries = DEFAULT_PHONE_COUNTRIES,
  onChange,
  onCountryChange,
  countrySearchPlaceholder = 'Search countries...',
  ...props
}, ref) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const inputRef = useRef<HTMLInputElement>(null);
  const [countryQuery, setCountryQuery] = useState('');

  const fallbackCountry = useMemo(
    () => resolveCountry(countries, country, defaultCountry),
    [countries, country, defaultCountry]
  );

  const initialPhoneValue = value ?? defaultValue ?? '';
  const initialParsed = useMemo(
    () => parsePhoneValue(initialPhoneValue, countries, fallbackCountry),
    [initialPhoneValue, countries, fallbackCountry]
  );

  const [internalCountryCode, setInternalCountryCode] = useState(initialParsed.country.code);
  const [internalDigits, setInternalDigits] = useState(initialParsed.nationalDigits);

  const selectedCountry = resolveCountry(
    countries,
    country ?? internalCountryCode,
    defaultCountry
  );

  useEffect(() => {
    if (value === undefined) {
      return;
    }

    const parsed = parsePhoneValue(value, countries, fallbackCountry);
    setInternalCountryCode(parsed.country.code);
    setInternalDigits(parsed.nationalDigits);
  }, [value, countries, fallbackCountry]);

  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

  const visibleDigits = value !== undefined
    ? parsePhoneValue(value, countries, selectedCountry).nationalDigits
    : internalDigits;
  const displayValue = formatPhoneDigits(visibleDigits, selectedCountry.format);
  const hiddenValue = buildPhoneValue(selectedCountry, visibleDigits);

  const filteredCountries = countries.filter((countryOption) => {
    if (!countryQuery) {
      return true;
    }

    const haystack = `${countryOption.label} ${countryOption.code} ${countryOption.dialCode}`.toLowerCase();
    return haystack.includes(countryQuery.toLowerCase());
  });

  const emitChange = (nextDigits: string, nextCountry: PhoneCountryOption) => {
    if (value === undefined) {
      setInternalDigits(nextDigits);
    }

    onChange?.({
      target: {
        name: props.name || inputId,
        value: buildPhoneValue(nextCountry, nextDigits),
      },
      persist: () => {},
    });
  };

  const handleCountrySelect = (nextCountry: PhoneCountryOption) => {
    if (disabled) {
      return;
    }

    if (country === undefined) {
      setInternalCountryCode(nextCountry.code);
    }

    onCountryChange?.(nextCountry);
    emitChange(visibleDigits, nextCountry);
    setCountryQuery('');
  };

  const phoneContent = (
    <div className={`flex min-w-0 flex-col gap-1.5 ${inline ? 'flex-1' : ''}`}>
      <div
        className={`flex overflow-hidden rounded-xl ${fieldControlFixedHeightClass} ${getFieldSurfaceClass({
          disabled,
          error: !!error,
          focusMode: 'focus-within',
        })}`}
      >
        <div className="h-full w-36 shrink-0" onMouseDown={(event) => event.stopPropagation()}>
          <Popover
            matchTriggerWidth
            disabled={disabled}
            trigger={
              <div
                className={`flex h-full items-center justify-between border-r bg-slate-900/50 px-3 text-sm ${
                  disabled
                    ? 'cursor-not-allowed text-slate-600'
                    : error
                      ? 'text-slate-100'
                      : 'text-slate-100'
                } ${getFieldDividerClass({ disabled, error: !!error })}`}
              >
                <div className="flex min-w-0 items-center gap-1.5 truncate">
                  <span className="truncate font-medium leading-none">{selectedCountry.code}</span>
                  <span className="truncate text-xs leading-none text-slate-400">{selectedCountry.dialCode}</span>
                </div>
                <ChevronDown size={16} className={disabled ? 'text-slate-700' : 'text-slate-400'} />
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
                      value={countryQuery}
                      onChange={(event) => setCountryQuery(event.target.value)}
                      placeholder={countrySearchPlaceholder}
                      className={`w-full rounded-lg py-2 pl-9 pr-3 text-sm text-slate-100 placeholder:text-slate-500 ${getFieldSurfaceClass({})}`}
                    />
                  </div>
                </div>
                <div className="max-h-60 overflow-y-auto py-2 custom-scrollbar">
                  {filteredCountries.map((countryOption) => {
                    const isActive = countryOption.code === selectedCountry.code;

                    return (
                      <button
                        key={countryOption.code}
                        type="button"
                        className={`flex w-full items-center justify-between px-3 py-2 text-left transition-colors ${
                          isActive
                            ? 'bg-cyan-500/15 text-cyan-300'
                            : 'text-slate-300 hover:bg-white/5 hover:text-slate-50'
                        }`}
                        onClick={() => {
                          handleCountrySelect(countryOption);
                          close();
                        }}
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{countryOption.label}</p>
                          <p className="truncate text-xs text-slate-400">
                            {countryOption.code} {countryOption.dialCode}
                          </p>
                        </div>
                        {isActive && <Phone size={15} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          />
        </div>

        <div className="relative flex h-full min-w-0 flex-1 items-center">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
            <Phone size={16} />
          </span>
          <input
            ref={inputRef}
            id={inputId}
            type="tel"
            value={displayValue}
            disabled={disabled}
            inputMode="tel"
            autoComplete="tel-national"
            placeholder={selectedCountry.placeholder ?? 'Phone number'}
            onChange={(event) => {
              const nextDigits = event.target.value.replace(/\D/g, '');
              emitChange(nextDigits, selectedCountry);
            }}
            className={`h-full w-full min-w-0 bg-slate-900/50 pl-10 pr-4 text-sm leading-none text-slate-50 placeholder:text-slate-500 focus:outline-none ${
              disabled ? 'cursor-not-allowed' : ''
            }`}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />
        </div>
      </div>

      <input type="hidden" name={props.name || inputId} value={hiddenValue} />

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
      {phoneContent}
    </FieldWrapper>
  );
});

PhoneField.displayName = 'PhoneField';
