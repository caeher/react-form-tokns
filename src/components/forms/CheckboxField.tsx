import { useId, forwardRef, InputHTMLAttributes, ElementType } from 'react';
import { Check as CheckIcon } from 'lucide-react';
import {
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldWrapper,
} from '../shared/form';

export interface CheckboxFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  hint?: string;
  error?: string;
  inline?: boolean;
  icon?: ElementType;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
}

export const CheckboxField = forwardRef<HTMLInputElement, CheckboxFieldProps>(({ 
  id, 
  label, 
  hint, 
  error, 
  className = '', 
  inline = false,
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  checked,
  onChange,
  ...props 
}, ref) => {
  const generatedId = useId();
  const checkboxId = id || generatedId;

  const checkboxControl = (
    <div className="flex h-5 items-center">
      <input
        ref={ref}
        id={checkboxId}
        type="checkbox"
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
        aria-invalid={!!error}
        aria-describedby={error ? `${checkboxId}-error` : hint ? `${checkboxId}-hint` : undefined}
        {...props}
      />
      <div className={`flex h-5 w-5 items-center justify-center rounded border border-(--field-border) bg-(--field-bg) transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white dark:peer-focus-visible:ring-offset-slate-950 peer-checked:[&_svg]:opacity-100 ${
        disabled ? 'opacity-50' :
        error
          ? 'border-red-500/50 peer-checked:border-red-500 peer-checked:bg-red-500 peer-focus-visible:ring-red-500/50'
          : 'group-hover:border-slate-400 dark:group-hover:border-slate-600 peer-checked:border-cyan-500 peer-checked:bg-cyan-500 peer-focus-visible:ring-cyan-500/50'
      }`}>
        <CheckIcon
          className="pointer-events-none h-3.5 w-3.5 opacity-0 transition-opacity text-white"
          strokeWidth={4}
        />
      </div>
    </div>
  );

  const labelContent = (label || hint || Icon) && (
    <div className="flex flex-col">
      <div className={`flex items-center gap-2 ${iconPosition === 'right' ? 'flex-row-reverse justify-end' : ''}`}>
        {Icon && <Icon size={16} className={disabled ? 'text-slate-300 dark:text-slate-700' : 'text-slate-500 dark:text-slate-400'} />}
        {label && <span className={`text-sm font-medium ${disabled ? 'text-slate-400 dark:text-slate-600' : 'text-slate-900 dark:text-slate-100'}`}>{label}</span>}
      </div>
      <FieldDescription
        as="span"
        id={`${checkboxId}-hint`}
        disabled={disabled}
        hidden={!!error}
        className="mt-0.5"
      >
        {hint}
      </FieldDescription>
    </div>
  );

  if (inline) {
    return (
      <FieldWrapper
        inline
        disabled={disabled}
        className={className}
        disabledClassName="opacity-50 cursor-not-allowed"
      >
        <FieldLabel
          htmlFor={checkboxId}
          inline
          disabled={disabled}
          inlineClassName="pt-0 sm:pt-0.5 sm:min-w-[120px] sm:shrink-0"
        >
          {label}
        </FieldLabel>
        <div className="flex flex-col gap-1.5 flex-1">
          <label htmlFor={checkboxId} className={`group relative flex items-start gap-3 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
            {checkboxControl}
            <div className="flex flex-col">
               {Icon && <Icon size={16} className={disabled ? 'text-slate-300 dark:text-slate-700' : 'text-slate-500 dark:text-slate-400'} />}
               <FieldDescription as="span" id={`${checkboxId}-hint`} disabled={disabled} hidden={!!error} className="mt-0.5">{hint}</FieldDescription>
            </div>
          </label>
          <FieldError id={`${checkboxId}-error`}>{error}</FieldError>
        </div>
      </FieldWrapper>
    );
  }

  return (
    <FieldWrapper
      disabled={disabled}
      className={className}
      disabledClassName="opacity-50 cursor-not-allowed"
    >
      <label htmlFor={checkboxId} className={`group relative flex items-start gap-3 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
        {checkboxControl}
        {labelContent}
      </label>
      <FieldError id={`${checkboxId}-error`} className="pl-8">
        {error}
      </FieldError>
    </FieldWrapper>
  );
});

CheckboxField.displayName = 'CheckboxField';
