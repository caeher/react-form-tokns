import { useId, forwardRef, ElementType } from 'react';
import { Tooltip } from '../ui/Tooltip';
import { FieldError, FieldWrapper } from '../shared/form';
import { getFieldSurfaceClass } from './utils/fieldStyles';

export interface ToggleOption {
  value: string | number;
  label?: string;
  icon?: ElementType;
  hint?: string;
}

export interface ToggleFieldProps {
  id?: string;
  name?: string;
  options: ToggleOption[];
  value?: (string | number)[];
  onChange?: (event: { target: { name: string; value: (string | number)[] }; persist: () => void }) => void;
  multiple?: boolean;
  error?: string;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ToggleField = forwardRef<HTMLDivElement, ToggleFieldProps>(({
  id,
  name,
  options = [],
  value = [],
  onChange,
  multiple = false,
  error,
  disabled = false,
  className = '',
  size = 'md'
}, ref) => {
  const generatedId = useId();
  const toggleId = id || generatedId;

  const handleToggle = (optValue: string | number) => {
    if (disabled) return;

    let newValue: (string | number)[];
    if (multiple) {
      if (value.includes(optValue)) {
        newValue = value.filter(v => v !== optValue);
      } else {
        newValue = [...value, optValue];
      }
    } else {
      if (value.includes(optValue)) {
        newValue = [];
      } else {
        newValue = [optValue];
      }
    }

    if (onChange) {
      onChange({
        target: { name: name || toggleId, value: newValue },
        persist: () => {},
      });
    }
  };

  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-3'
  };

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 22
  };

  return (
    <FieldWrapper className={className} ref={ref}>
      <div className={`inline-flex w-fit overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-900/30 ${getFieldSurfaceClass({
        disabled,
        error: !!error,
        focusMode: 'focus-within',
      })}`}>
        {options.map((option, index) => {
          const isActive = value.includes(option.value);
          const Icon = option.icon;
          
          const buttonContent = (
            <button
              type="button"
              disabled={disabled}
              onClick={() => handleToggle(option.value)}
              className={`flex items-center transition-all ${sizeClasses[size]} ${
                isActive 
                  ? 'bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-semibold' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-200'
              } ${index !== 0 ? 'border-l border-slate-200 dark:border-white/10' : ''}`}
            >
              {Icon && <Icon size={iconSizes[size]} />}
              {option.label && <span>{option.label}</span>}
            </button>
          );

          return option.hint ? (
            <Tooltip key={option.value} content={option.hint} side="top">
              {buttonContent}
            </Tooltip>
          ) : (
            <div key={option.value}>{buttonContent}</div>
          );
        })}
      </div>
      
      <FieldError>{error}</FieldError>

      <input 
        type="hidden" 
        name={name || toggleId} 
        value={JSON.stringify(value)} 
      />
    </FieldWrapper>
  );
});

ToggleField.displayName = 'ToggleField';
