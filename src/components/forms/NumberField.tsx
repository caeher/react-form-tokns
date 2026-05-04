import { useId, forwardRef, InputHTMLAttributes, useState, useRef, useEffect } from 'react';
import { Minus, Plus } from 'lucide-react';
import {
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldWrapper,
} from '../shared/form';

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
    <div className={`flex flex-col gap-1.5 ${inline ? 'flex-1' : ''}`}>
      <div className="flex">
        <button
          type="button"
          disabled={disabled || (min !== undefined && currentValue <= min)}
          onPointerDown={() => startTimer(-1)}
          onPointerUp={stopTimer}
          onPointerLeave={stopTimer}
          className={`flex items-center justify-center w-11 h-11 rounded-l-xl border border-r-0 transition-colors ${
            disabled 
              ? 'border-white/5 text-slate-600 bg-slate-900/30 cursor-not-allowed' 
              : 'border-white/10 bg-slate-900/50 text-slate-300 hover:bg-white/5 active:bg-white/10'
          }`}
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
          className={`w-full h-11 text-center bg-slate-900/50 border-y px-2 text-sm text-slate-50 transition-all focus:outline-none ${
            disabled ? 'border-white/5 cursor-not-allowed' : 
            error
              ? 'border-red-500/50 focus:border-red-500'
              : 'border-white/10 focus:border-cyan-400'
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
          className={`flex items-center justify-center w-11 h-11 rounded-r-xl border border-l-0 transition-colors ${
            disabled 
              ? 'border-white/5 text-slate-600 bg-slate-900/30 cursor-not-allowed' 
              : 'border-white/10 bg-slate-900/50 text-slate-300 hover:bg-white/5 active:bg-white/10'
          }`}
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
