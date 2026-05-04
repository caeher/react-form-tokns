import { useId, forwardRef, useState, ElementType, useMemo } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
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
import { parseTimeValue } from './utils/parseTimeValue';
import { CalendarGrid } from './utils/CalendarGrid';

export interface DatetimeFieldProps {
  id?: string;
  name?: string;
  label?: string;
  hint?: string;
  error?: string;
  inline?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: ElementType;
  iconPosition?: 'left' | 'right';
  value?: string;
  onChange?: (event: { target: { name: string; value: string }; persist: () => void }) => void;
  placeholder?: string;
  min?: string;
  max?: string;
  showSeconds?: boolean;
  use24Hour?: boolean;
  minuteStep?: number;
}

export const DatetimeField = forwardRef<HTMLInputElement, DatetimeFieldProps>(({
  id,
  name,
  label,
  hint,
  error,
  inline = false,
  disabled = false,
  className = '',
  icon: Icon = CalendarIcon,
  iconPosition = 'right',
  value = '',
  onChange,
  placeholder = 'Select date & time...',
  min,
  max,
  showSeconds = false,
  use24Hour = true,
  minuteStep = 1,
}, ref) => {
  const generatedId = useId();
  const datetimeId = id || generatedId;

  const [internalValue, setInternalValue] = useState(value);
  const currentValue = value !== undefined ? value : internalValue;

  const [datePart, timePart] = currentValue.split(' ');
  const parsedDate = parseDateValue(datePart);
  const parsedTime = parseTimeValue(timePart) || { hours: 0, minutes: 0, seconds: 0 };

  const [viewDate, setViewDate] = useState<CalendarDate>(() => parsedDate || today(getLocalTimeZone()));

  const minDate = useMemo(() => min ? parseDateValue(min.split(' ')[0]) : null, [min]);
  const maxDate = useMemo(() => max ? parseDateValue(max.split(' ')[0]) : null, [max]);

  const handleUpdate = (date: CalendarDate | null, hours: number, minutes: number, seconds: number) => {
    if (!date) return;
    
    const dStr = date.toString();
    const hh = String(hours).padStart(2, '0');
    const mm = String(minutes).padStart(2, '0');
    const ss = String(seconds).padStart(2, '0');
    const tStr = showSeconds ? `${hh}:${mm}:${ss}` : `${hh}:${mm}`;
    
    const newValue = `${dStr} ${tStr}`;
    setInternalValue(newValue);
    if (onChange) {
      onChange({
        target: { name: name || datetimeId, value: newValue },
        persist: () => {},
      });
    }
  };

  const hours = Array.from({ length: use24Hour ? 24 : 12 }, (_, i) => use24Hour ? i : i + 1);
  const minutesArr = Array.from({ length: 60 / minuteStep }, (_, i) => i * minuteStep);

  const renderTimeColumn = (label: string, items: number[] | string[], current: number | string, type: 'h' | 'm' | 'ampm') => (
    <div className="flex flex-col items-center">
      <span className="text-[10px] font-bold text-slate-500 uppercase mb-2">{label}</span>
      <div className="h-[120px] overflow-y-auto custom-scrollbar flex flex-col gap-1 px-1">
        {items.map((item) => {
          const isSelected = item === current;
          return (
            <button
              key={item}
              type="button"
              onClick={() => {
                if (type === 'h') {
                  const ampm = parsedTime.hours >= 12 ? 'PM' : 'AM';
                  let h = item as number;
                  if (!use24Hour) {
                    if (ampm === 'PM' && h < 12) h += 12;
                    if (ampm === 'AM' && h === 12) h = 0;
                  }
                  handleUpdate(parsedDate || viewDate, h, parsedTime.minutes, parsedTime.seconds);
                } else if (type === 'm') {
                  handleUpdate(parsedDate || viewDate, parsedTime.hours, item as number, parsedTime.seconds);
                } else if (type === 'ampm') {
                  const h12 = parsedTime.hours % 12 || 12;
                  let h = h12;
                  if (item === 'PM' && h12 < 12) h += 12;
                  if (item === 'AM' && h12 === 12) h = 0;
                  handleUpdate(parsedDate || viewDate, h, parsedTime.minutes, parsedTime.seconds);
                }
              }}
              className={`h-7 w-9 flex items-center justify-center rounded-lg text-xs transition-all ${
                isSelected 
                  ? 'bg-cyan-500/20 text-cyan-400 font-bold' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
              }`}
            >
              {typeof item === 'number' ? String(item).padStart(2, '0') : item}
            </button>
          );
        })}
      </div>
    </div>
  );

  const displayDatetime = () => {
    if (!currentValue) return placeholder;
    if (use24Hour && !showSeconds) return currentValue;
    
    const [d, t] = currentValue.split(' ');
    const p = parseTimeValue(t);
    if (!p) return currentValue;

    const h12 = p.hours % 12 || 12;
    const ampm = p.hours >= 12 ? 'PM' : 'AM';
    const mm = String(p.minutes).padStart(2, '0');
    const ss = String(p.seconds).padStart(2, '0');
    const timeStr = showSeconds ? `${h12}:${mm}:${ss} ${ampm}` : `${h12}:${mm} ${ampm}`;
    return `${d} ${timeStr}`;
  };

  const datetimeContent = (
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
              className={`w-full rounded-xl border bg-slate-900/50 px-4 py-2.5 text-sm transition-all flex items-center min-h-[42px] ${
                disabled
                  ? 'border-white/5 cursor-not-allowed pointer-events-none'
                  : error
                    ? 'border-red-500/50 hover:border-red-500 cursor-pointer'
                    : 'border-white/10 hover:border-white/20 cursor-pointer'
              } ${Icon && iconPosition === 'left' ? 'pl-10' : ''} ${Icon && iconPosition === 'right' ? 'pr-10' : ''}`}
            >
              <span className={currentValue ? (disabled ? 'text-slate-400' : 'text-slate-50') : 'text-slate-500'}>
                {displayDatetime()}
              </span>
            </div>
            {Icon && iconPosition === 'right' && (
              <div className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${disabled ? 'text-slate-600' : 'text-slate-400'}`}>
                <Icon size={18} />
              </div>
            )}
          </div>
        }
        content={() => (
          <div className="flex flex-col w-[300px]">
            <CalendarGrid 
              viewDate={viewDate}
              onViewDateChange={setViewDate}
              selectedDate={parsedDate}
              onDateSelect={(date) => handleUpdate(date, parsedTime.hours, parsedTime.minutes, parsedTime.seconds)}
              minDate={minDate}
              maxDate={maxDate}
            />
            <div className="p-4 border-t border-white/5 flex justify-center gap-6 select-none bg-slate-900/30">
              {renderTimeColumn('Hrs', hours, use24Hour ? parsedTime.hours : (parsedTime.hours % 12 || 12), 'h')}
              {renderTimeColumn('Min', minutesArr, parsedTime.minutes, 'm')}
              {!use24Hour && renderTimeColumn('AM/PM', ['AM', 'PM'], parsedTime.hours >= 12 ? 'PM' : 'AM', 'ampm')}
            </div>
          </div>
        )}
      />

      <input
        ref={ref}
        type="hidden"
        name={name}
        disabled={disabled}
        value={currentValue}
      />

      <FieldDescription id={`${datetimeId}-hint`} disabled={disabled} hidden={!!error}>
        {hint}
      </FieldDescription>
      <FieldError id={`${datetimeId}-error`}>{error}</FieldError>
    </div>
  );

  return (
    <FieldWrapper
      inline={inline}
      disabled={disabled}
      className={className}
      disabledClassName="opacity-50"
    >
      <FieldLabel htmlFor={datetimeId} inline={inline} disabled={disabled}>
        {label}
      </FieldLabel>
      {datetimeContent}
    </FieldWrapper>
  );
});

DatetimeField.displayName = 'DatetimeField';
