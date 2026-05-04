import { forwardRef, useId, useState, useEffect, type ChangeEvent, type InputHTMLAttributes } from 'react';
import {
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldWrapper,
} from '../shared/form';

export interface ProgressFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'onChange' | 'value' | 'defaultValue' | 'min' | 'max' | 'step'> {
  id?: string;
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
  showValue?: boolean;
  variant?: 'default' | 'gradient' | 'striped';
  size?: 'sm' | 'md' | 'lg';
  color?: 'cyan' | 'green' | 'amber' | 'red';
  interactive?: boolean;
  onChange?: (event: { target: { name: string; value: number }; persist: () => void }) => void;
}

const clampValue = (nextValue: number, min: number, max: number) => {
  if (!Number.isFinite(nextValue)) return min;
  return Math.min(max, Math.max(min, nextValue));
};

export const ProgressField = forwardRef<HTMLInputElement, ProgressFieldProps>(({
  id,
  label,
  hint,
  error,
  inline = false,
  disabled = false,
  className = '',
  value,
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  showValue = true,
  variant = 'default',
  size = 'md',
  color = 'cyan',
  interactive,
  onChange,
  name,
  ...props
}, ref) => {
  const generatedId = useId();
  const progressId = id || generatedId;
  const safeMax = max <= min ? min + 1 : max;
  const isInteractive = interactive ?? !!onChange;
  const [internalValue, setInternalValue] = useState(() => clampValue(defaultValue ?? value ?? min, min, safeMax));
  const currentValue = value !== undefined ? clampValue(value, min, safeMax) : internalValue;

  useEffect(() => {
    if (value === undefined) {
      setInternalValue(clampValue(defaultValue ?? min, min, safeMax));
    }
  }, [defaultValue, min, safeMax, value]);

  const percentage = ((currentValue - min) / (safeMax - min)) * 100;

  const colorClasses = {
    cyan: 'bg-cyan-500',
    green: 'bg-emerald-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
  };

  const gradientClasses = {
    cyan: 'bg-gradient-to-r from-cyan-600 to-cyan-400',
    green: 'bg-gradient-to-r from-emerald-600 to-emerald-400',
    amber: 'bg-gradient-to-r from-amber-600 to-amber-400',
    red: 'bg-gradient-to-r from-red-600 to-red-400',
  };

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const barContent = (
    <div className={`flex flex-col gap-1.5 ${inline ? 'flex-1' : ''}`}>
      <div className="flex items-center gap-3">
        <div
          className={`relative flex-1 ${sizeClasses[size]} rounded-full bg-slate-800 border border-white/5 overflow-hidden ${isInteractive && !disabled ? 'cursor-pointer' : ''}`}
          role={isInteractive ? undefined : 'progressbar'}
          aria-valuenow={isInteractive ? undefined : currentValue}
          aria-valuemin={isInteractive ? undefined : min}
          aria-valuemax={isInteractive ? undefined : safeMax}
        >
          {isInteractive && (
            <input
              ref={ref}
              id={progressId}
              type="range"
              name={name}
              min={min}
              max={safeMax}
              step={step}
              value={currentValue}
              disabled={disabled}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const nextValue = clampValue(event.currentTarget.valueAsNumber, min, safeMax);

                if (value === undefined) {
                  setInternalValue(nextValue);
                }

                onChange?.({
                  target: {
                    name: name || progressId,
                    value: nextValue,
                  },
                  persist: () => {},
                });
              }}
              aria-invalid={!!error}
              aria-describedby={error ? `${progressId}-error` : hint ? `${progressId}-hint` : undefined}
              className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
              {...props}
            />
          )}
          <div
            aria-hidden="true"
            className={`absolute top-0 left-0 h-full transition-all duration-500 ease-out ${
              variant === 'gradient' ? gradientClasses[color] : colorClasses[color]
            } ${variant === 'striped' ? 'progress-striped' : ''}`}
            style={{ width: `${percentage}%` }}
          />
          {isInteractive && (
            <span
              aria-hidden="true"
              className={`absolute top-1/2 z-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-white shadow-lg shadow-slate-950/40 transition-all ${
                disabled ? 'opacity-60' : ''
              }`}
              style={{ left: `${percentage}%` }}
            />
          )}
        </div>
        {showValue && (
          <span className="text-xs font-mono font-medium text-slate-400 min-w-[3ch] text-right">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
      <FieldDescription id={`${progressId}-hint`} disabled={disabled} hidden={!!error}>
        {hint}
      </FieldDescription>
      <FieldError id={`${progressId}-error`}>{error}</FieldError>
    </div>
  );

  return (
    <FieldWrapper
      inline={inline}
      disabled={disabled}
      className={className}
      disabledClassName="opacity-50"
    >
      <FieldLabel
        htmlFor={isInteractive ? progressId : undefined}
        inline={inline}
        disabled={disabled}
        inlineClassName="pt-0.5 min-w-[120px] shrink-0"
      >
        {label}
      </FieldLabel>
      {barContent}
    </FieldWrapper>
  );
});

ProgressField.displayName = 'ProgressField';
