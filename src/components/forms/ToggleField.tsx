import { useId, forwardRef, ElementType } from 'react';
import { Tooltip } from '../ui/Tooltip';

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
    <div className={`flex flex-col gap-1.5 ${className}`} ref={ref}>
      <div className={`inline-flex rounded-xl border border-white/10 bg-slate-900/30 overflow-hidden w-fit ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
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
                  ? 'bg-cyan-500/20 text-cyan-400 font-semibold' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
              } ${index !== 0 ? 'border-l border-white/10' : ''}`}
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
      
      {error && (
        <p className="text-xs font-medium text-red-400">
          {error}
        </p>
      )}

      <input 
        type="hidden" 
        name={name || toggleId} 
        value={JSON.stringify(value)} 
      />
    </div>
  );
});

ToggleField.displayName = 'ToggleField';
