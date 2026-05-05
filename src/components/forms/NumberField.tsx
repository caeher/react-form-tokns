import { useId, forwardRef, InputHTMLAttributes, useState, useRef, useEffect } from 'react';
import { Minus, Plus } from 'lucide-react';
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

export interface NumberFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label?: string;
  hint?: string;
  error?: string;
  inline?: boolean;
  disabled?: boolean;
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (event: { target: { name: string; value: number }; persist: () => void }) => void;
}

export const NumberField = forwardRef<HTMLInputElement, NumberFieldProps>(({
  id,
  label,
  hint,
  error,
  inline = false,
  disabled = false,
  className = '',
  value,
  defaultValue,
  min,
  max,
  step = 1,
  onChange,
  ...props
}, ref) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  const [internalValue, setInternalValue] = useState<number>(() => {
    if (value !== undefined) return value;
    if (defaultValue !== undefined) return defaultValue;
    return 0;
  });

  const currentValue = value !== undefined ? value : internalValue;
  const timerRef = useRef<number | null>(null);

  const updateValue = (dir: 1 | -1) => {
    if (disabled) return;
    
    setInternalValue(prev => {
      const current = value !== undefined ? value : prev;
      let next = current + (dir * step);
      if (min !== undefined) next = Math.max(min, next);
      if (max !== undefined) next = Math.min(max, next);
      
      if (onChange && next !== current) {
        onChange({
          target: { name: props.name || inputId, value: next },
          persist: () => {},
        });
      }
      return next;
    });
  };

  const startTimer = (dir: 1 | -1) => {
    updateValue(dir);
    timerRef.current = window.setTimeout(() => {
      timerRef.current = window.setInterval(() => updateValue(dir), 80);
    }, 400);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return stopTimer;
  }, []);

  const inputContent = (
    <div className={`flex min-w-0 flex-col gap-1.5 ${inline ? 'flex-1' : ''}`}>
      <div
        className={`flex overflow-hidden rounded-xl ${fieldControlFixedHeightClass} ${getFieldSurfaceClass({
          disabled,
          error: !!error,
          focusMode: 'focus-within',
        })}`}
      >
        <button
          type="button"
          disabled={disabled || (min !== undefined && currentValue <= min)}
          onPointerDown={() => startTimer(-1)}
          onPointerUp={stopTimer}
          onPointerLeave={stopTimer}
          className={`flex h-full w-[42px] items-center justify-center border-r transition-colors ${
            disabled 
              ? 'cursor-not-allowed bg-slate-900/30 text-slate-600' 
              : error
                ? 'bg-slate-900/50 text-slate-300 hover:bg-white/5 active:bg-white/10'
                : 'bg-slate-900/50 text-slate-300 hover:bg-white/5 active:bg-white/10'
          } ${getFieldDividerClass({ disabled, error: !!error })}`}
        >
          <Minus size={18} />
        </button>
        <input
          ref={ref}
          id={inputId}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={currentValue}
          disabled={disabled}
          readOnly
          className={`h-full w-full min-w-0 bg-slate-900/50 px-2 text-center text-sm text-slate-50 transition-all focus:outline-none ${
            disabled ? 'cursor-not-allowed' : ''
          }`}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...props}
        />
        <button
          type="button"
          disabled={disabled || (max !== undefined && currentValue >= max)}
          onPointerDown={() => startTimer(1)}
          onPointerUp={stopTimer}
          onPointerLeave={stopTimer}
          className={`flex h-full w-[42px] items-center justify-center border-l transition-colors ${
            disabled 
              ? 'cursor-not-allowed bg-slate-900/30 text-slate-600' 
              : error
                ? 'bg-slate-900/50 text-slate-300 hover:bg-white/5 active:bg-white/10'
                : 'bg-slate-900/50 text-slate-300 hover:bg-white/5 active:bg-white/10'
          } ${getFieldDividerClass({ disabled, error: !!error })}`}
        >
          <Plus size={18} />
        </button>
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
      {inputContent}
    </FieldWrapper>
  );
});

NumberField.displayName = 'NumberField';
