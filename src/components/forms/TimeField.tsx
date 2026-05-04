import { useId, forwardRef, useState, ElementType } from 'react';
import { Clock } from 'lucide-react';
import { Popover } from '../ui/Popover';
import {
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldWrapper,
} from '../shared/form';
import { parseTimeValue } from './utils/parseTimeValue';

export interface TimeFieldProps {
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
  showSeconds?: boolean;
  use24Hour?: boolean;
  min?: string;
  max?: string;
  minuteStep?: number;
}

export const TimeField = forwardRef<HTMLInputElement, TimeFieldProps>(({
  id,
  name,
  label,
  hint,
  error,
  inline = false,
  disabled = false,
  className = '',
  icon: Icon = Clock,
  iconPosition = 'right',
  value = '',
  onChange,
  placeholder = 'Select time...',
  showSeconds = false,
  use24Hour = true,
  minuteStep = 1,
}, ref) => {
  const generatedId = useId();
  const timeId = id || generatedId;

  const [internalTime, setInternalTime] = useState(value);
  const currentTime = value !== undefined ? value : internalTime;
  const parsed = parseTimeValue(currentTime) || { hours: 0, minutes: 0, seconds: 0 };

  const hours = Array.from({ length: use24Hour ? 24 : 12 }, (_, i) => use24Hour ? i : i + 1);
  const minutes = Array.from({ length: 60 / minuteStep }, (_, i) => i * minuteStep);
  const seconds = Array.from({ length: 60 }, (_, i) => i);

  const formatTime = (h: number, m: number, s: number, ampm?: string) => {
    let finalH = h;
    if (!use24Hour && ampm) {
      if (ampm === 'PM' && h < 12) finalH += 12;
      if (ampm === 'AM' && h === 12) finalH = 0;
    }
    const hh = String(finalH).padStart(2, '0');
    const mm = String(m).padStart(2, '0');
    const ss = String(s).padStart(2, '0');
    return showSeconds ? `${hh}:${mm}:${ss}` : `${hh}:${mm}`;
  };

  const handleSelect = (type: 'hours' | 'minutes' | 'seconds' | 'ampm', val: number | string) => {
    let newH = parsed.hours;
    let newM = parsed.minutes;
    let newS = parsed.seconds;
    let ampm = parsed.hours >= 12 ? 'PM' : 'AM';

    if (type === 'hours') {
      if (!use24Hour) {
        newH = ampm === 'PM' && (val as number) < 12 ? (val as number) + 12 : (ampm === 'AM' && (val as number) === 12 ? 0 : (val as number));
      } else {
        newH = val as number;
      }
    } else if (type === 'minutes') {
      newM = val as number;
    } else if (type === 'seconds') {
      newS = val as number;
    } else if (type === 'ampm') {
      const h12 = parsed.hours % 12 || 12;
      ampm = val as string;
      newH = ampm === 'PM' && h12 < 12 ? h12 + 12 : (ampm === 'AM' && h12 === 12 ? 0 : h12);
    }

    const formatted = formatTime(newH, newM, newS);
    setInternalTime(formatted);
    if (onChange) {
      onChange({
        target: { name: name || timeId, value: formatted },
        persist: () => {},
      });
    }
  };

  const displayTime = () => {
    if (!currentTime) return placeholder;
    const p = parseTimeValue(currentTime);
    if (!p) return placeholder;
    
    if (use24Hour) return currentTime;
    
    const h12 = p.hours % 12 || 12;
    const ampm = p.hours >= 12 ? 'PM' : 'AM';
    const mm = String(p.minutes).padStart(2, '0');
    const ss = String(p.seconds).padStart(2, '0');
    return showSeconds ? `${h12}:${mm}:${ss} ${ampm}` : `${h12}:${mm} ${ampm}`;
  };

  const renderColumn = (label: string, items: number[] | string[], current: number | string, type: 'hours' | 'minutes' | 'seconds' | 'ampm') => (
    <div className="flex flex-col items-center">
      <span className="text-[10px] font-bold text-slate-500 uppercase mb-2">{label}</span>
      <div className="h-[180px] overflow-y-auto custom-scrollbar flex flex-col gap-1 px-1">
        {items.map((item) => {
          const isSelected = item === current;
          return (
            <button
              key={item}
              type="button"
              onClick={() => handleSelect(type, item)}
              className={`h-8 w-10 flex items-center justify-center rounded-lg text-sm transition-all ${
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

  const timeContent = (
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
              <span className={currentTime ? (disabled ? 'text-slate-400' : 'text-slate-50') : 'text-slate-500'}>
                {displayTime()}
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
          <div className="p-4 flex gap-4 select-none">
            {renderColumn('Hrs', hours, use24Hour ? parsed.hours : (parsed.hours % 12 || 12), 'hours')}
            {renderColumn('Min', minutes, parsed.minutes, 'minutes')}
            {showSeconds && renderColumn('Sec', seconds, parsed.seconds, 'seconds')}
            {!use24Hour && renderColumn('AM/PM', ['AM', 'PM'], parsed.hours >= 12 ? 'PM' : 'AM', 'ampm')}
          </div>
        )}
      />

      <input
        ref={ref}
        type="hidden"
        name={name}
        disabled={disabled}
        value={currentTime}
      />

      <FieldDescription id={`${timeId}-hint`} disabled={disabled} hidden={!!error}>
        {hint}
      </FieldDescription>
      <FieldError id={`${timeId}-error`}>{error}</FieldError>
    </div>
  );

  return (
    <FieldWrapper
      inline={inline}
      disabled={disabled}
      className={className}
      disabledClassName="opacity-50"
    >
      <FieldLabel htmlFor={timeId} inline={inline} disabled={disabled}>
        {label}
      </FieldLabel>
      {timeContent}
    </FieldWrapper>
  );
});

TimeField.displayName = 'TimeField';
