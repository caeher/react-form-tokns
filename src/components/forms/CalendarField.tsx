import { useId, forwardRef, useState, useMemo, ElementType } from 'react';
import { 
  Calendar as CalendarIcon, 
} from 'lucide-react';
import { 
  CalendarDate, 
  getLocalTimeZone, 
  today, 
} from '@internationalized/date';
import { Popover } from '../ui/Popover';
import {
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldWrapper,
} from '../shared/form';
import { parseDateValue } from './utils/parseDateValue';
import { CalendarGrid } from './utils/CalendarGrid';
import { fieldControlHeightClass, getFieldSurfaceClass } from './utils/fieldStyles';

export interface CalendarFieldProps {
  id?: string;
  label?: string;
  hint?: string;
  error?: string;
  value?: string | CalendarDate;
  defaultValue?: string | CalendarDate;
  onChange?: (event: { target: { name: string; value: string }; persist: () => void }) => void;
  name?: string;
  placeholder?: string;
  className?: string;
  inline?: boolean;
  icon?: ElementType;
  iconPosition?: 'left' | 'right';
  min?: string | CalendarDate;
  max?: string | CalendarDate;
  disabled?: boolean;
}

export const CalendarField = forwardRef<HTMLInputElement, CalendarFieldProps>(({ 
  id, 
  label, 
  hint, 
  error, 
  value, 
  defaultValue,
  onChange, 
  name,
  placeholder = 'Select date...',
  className = '', 
  inline = false,
  icon: Icon = CalendarIcon,
  iconPosition = 'right',
  min,
  max,
  disabled = false,
  ...props 
}, ref) => {
  const generatedId = useId();
  const calendarId = id || generatedId;

  const [internalDate, setInternalDate] = useState<CalendarDate | null>(() => {
    const initial = value !== undefined ? value : defaultValue;
    return parseDateValue(initial);
  });

  const currentDate = value !== undefined ? parseDateValue(value) : internalDate;
  const [viewDate, setViewDate] = useState<CalendarDate>(() => currentDate || today(getLocalTimeZone()));

  const minDate = useMemo(() => parseDateValue(min), [min]);
  const maxDate = useMemo(() => parseDateValue(max), [max]);

  const handleDateSelect = (date: CalendarDate, close: () => void) => {
    if (disabled) return;
    setInternalDate(date);
    if (onChange) {
      onChange({
        target: { 
          value: date.toString(), 
          name: name || calendarId 
        },
        persist: () => {},
      });
    }
    close();
  };

  const calendarContent = (
    <div className={`flex flex-col gap-1.5 ${inline ? 'flex-1' : ''}`}>
      <Popover
        matchTriggerWidth={false}
        disabled={disabled}
        trigger={
          <div className="relative">
            {Icon && iconPosition === 'left' && (
              <div className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none ${disabled ? 'text-slate-600' : 'text-slate-400'}`}>
                <Icon size={18} />
              </div>
            )}
            <div
              className={`flex w-full items-center rounded-xl px-4 py-2.5 text-sm ${
                disabled ? 'pointer-events-none' : 'cursor-pointer'
              } ${fieldControlHeightClass} ${getFieldSurfaceClass({
                disabled,
                error: !!error,
                focusMode: 'group-focus',
              })} ${Icon && iconPosition === 'left' ? 'pl-10' : ''} ${Icon && iconPosition === 'right' ? 'pr-10' : ''}`}
            >
              <span className={`block min-w-0 truncate ${currentDate ? (disabled ? 'text-slate-400' : 'text-slate-50') : 'text-slate-500'}`}>
                {currentDate ? currentDate.toString() : placeholder}
              </span>
            </div>
            {Icon && iconPosition === 'right' && (
              <div className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${disabled ? 'text-slate-600' : 'text-slate-400'}`}>
                <Icon size={18} />
              </div>
            )}
          </div>
        }
        content={(close) => (
          <CalendarGrid 
            viewDate={viewDate}
            onViewDateChange={setViewDate}
            selectedDate={currentDate}
            onDateSelect={(date) => handleDateSelect(date, close)}
            minDate={minDate}
            maxDate={maxDate}
          />
        )}
      />

      <input
        ref={ref}
        type="hidden"
        name={name}
        disabled={disabled}
        value={currentDate ? currentDate.toString() : ''}
        {...props}
      />

      <FieldDescription id={`${calendarId}-hint`} disabled={disabled} hidden={!!error}>
        {hint}
      </FieldDescription>
      <FieldError id={`${calendarId}-error`}>{error}</FieldError>
    </div>
  );

  return (
    <FieldWrapper inline={inline} disabled={disabled} className={className}>
      <FieldLabel htmlFor={calendarId} inline={inline} disabled={disabled}>
        {label}
      </FieldLabel>
      {calendarContent}
    </FieldWrapper>
  );
});

CalendarField.displayName = 'CalendarField';
