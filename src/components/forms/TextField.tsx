import { useId, forwardRef, InputHTMLAttributes, ElementType } from 'react';
import {
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldWrapper,
} from '../shared/form';
import { fieldControlHeightClass, getFieldSurfaceClass } from './utils/fieldStyles';

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  inline?: boolean;
  icon?: ElementType;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(({ 
  id, 
  label, 
  hint, 
  error, 
  type = 'text', 
  className = '', 
  inline = false,
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  ...props 
}, ref) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  const inputContent = (
    <div className={`flex flex-col gap-1.5 ${inline ? 'flex-1' : ''}`}>
      <div className="relative">
        {Icon && iconPosition === 'left' && (
          <div className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none ${disabled ? 'text-slate-300 dark:text-slate-700' : 'text-slate-500 dark:text-slate-400'}`}>
            <Icon size={18} />
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          disabled={disabled}
          className={`w-full rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 ${fieldControlHeightClass} ${getFieldSurfaceClass({
            disabled,
            error: !!error,
          })} ${Icon && iconPosition === 'left' ? 'pl-10' : ''} ${Icon && iconPosition === 'right' ? 'pr-10' : ''}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...props}
        />
        {Icon && iconPosition === 'right' && (
          <div className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${disabled ? 'text-slate-300 dark:text-slate-700' : 'text-slate-500 dark:text-slate-400'}`}>
            <Icon size={18} />
          </div>
        )}
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

TextField.displayName = 'TextField';
