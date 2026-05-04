import { useId, forwardRef, InputHTMLAttributes, ElementType } from 'react';
import {
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldWrapper,
} from '../shared/form';

export interface RadioOption {
  label: string;
  value: string | number;
}

export interface RadioGroupFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value'> {
  label?: string;
  hint?: string;
  error?: string;
  options?: RadioOption[];
  value?: string | number;
  inline?: boolean;
  icon?: ElementType;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
}

export const RadioGroupField = forwardRef<HTMLInputElement, RadioGroupFieldProps>(({ 
  id, 
  label, 
  hint, 
  error, 
  name, 
  options = [], 
  value, 
  onChange, 
  className = '', 
  inline = false,
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  ...props 
}, ref) => {
  const generatedId = useId();
  const groupId = id || generatedId;
  const groupName = name || groupId;

  const content = (
    <div className={`flex flex-col gap-3 ${inline ? 'flex-1' : ''}`}>
      <div className="flex flex-col gap-3">
        {options.map((option, index) => {
          const optionId = `${groupId}-opt-${index}`;
          const isChecked = value === option.value;
          
          return (
            <label key={option.value} htmlFor={optionId} className={`group relative flex items-start gap-3 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
              <div className="flex h-5 items-center">
                <input
                  ref={index === 0 ? ref : null}
                  id={optionId}
                  type="radio"
                  name={groupName}
                  value={option.value}
                  checked={isChecked}
                  onChange={onChange}
                  disabled={disabled}
                  className="peer sr-only"
                  aria-invalid={!!error}
                  {...props}
                />
                <div className={`flex h-5 w-5 items-center justify-center rounded-full border bg-slate-900/50 transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-slate-950 ${
                  disabled ? 'border-white/5 opacity-50' :
                  error
                    ? 'border-red-500/50 peer-checked:border-red-500 peer-focus-visible:ring-red-500/50'
                    : 'border-white/20 group-hover:border-white/40 peer-checked:border-cyan-400 peer-focus-visible:ring-cyan-500/50'
                }`}>
                  <div className={`h-2.5 w-2.5 rounded-full transition-all ${
                    isChecked ? (error ? 'bg-red-500 scale-100' : (disabled ? 'bg-slate-600 scale-100' : 'bg-cyan-400 scale-100')) : 'scale-0'
                  }`} />
                </div>
              </div>
              <span className={`text-sm ${disabled ? 'text-slate-500' : 'text-slate-200'}`}>{option.label}</span>
            </label>
          );
        })}
      </div>

      <FieldDescription id={`${groupId}-hint`} disabled={disabled} hidden={!!error} className="mt-1">
        {hint}
      </FieldDescription>
      <FieldError id={`${groupId}-error`} className="mt-1">
        {error}
      </FieldError>
    </div>
  );

  return (
    <FieldWrapper
      inline={inline}
      disabled={disabled}
      className={className}
      stackedClassName="flex-col gap-2"
      disabledClassName="opacity-50 cursor-not-allowed"
      role="radiogroup"
      aria-labelledby={label ? `${groupId}-label` : undefined}
    >
      {label && (
        <div className={`flex items-center gap-2 mb-1 ${inline ? 'sm:pt-0.5 sm:min-w-[120px] sm:shrink-0' : ''} ${iconPosition === 'right' ? 'flex-row-reverse justify-end' : ''}`}>
          {Icon && <Icon size={16} className={disabled ? 'text-slate-600' : 'text-slate-400'} />}
          <FieldLabel
            as="span"
            id={`${groupId}-label`}
            disabled={disabled}
            className="mb-0"
            inline={false}
          >
            {label}
          </FieldLabel>
        </div>
      )}
      {content}
    </FieldWrapper>
  );
});

RadioGroupField.displayName = 'RadioGroupField';
