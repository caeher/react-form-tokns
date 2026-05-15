import { useId, forwardRef, InputHTMLAttributes, ElementType } from 'react';
import {
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldWrapper,
} from '../shared/form';

export interface SwitchFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  hint?: string;
  error?: string;
  inline?: boolean;
  icon?: ElementType;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
}

export const SwitchField = forwardRef<HTMLInputElement, SwitchFieldProps>(({ 
  id, 
  label, 
  hint, 
  error, 
  className = '', 
  checked, 
  onChange, 
  inline = false,
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  ...props 
}, ref) => {
  const generatedId = useId();
  const switchId = id || generatedId;

  const content = (
    <label
      htmlFor={switchId}
      className={`flex items-center justify-between gap-3 w-full ${
        inline
          ? ''
          : `rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100/50 dark:bg-slate-900/30 p-3 transition-colors ${
              disabled ? '' : 'hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-200/50 dark:hover:bg-slate-900/50'
            }`
      } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {(label || hint || Icon) && (
        <div className="flex flex-col">
          <div className={`flex items-center gap-2 ${iconPosition === 'right' ? 'flex-row-reverse justify-end' : ''}`}>
            {Icon && <Icon size={16} className={disabled ? 'text-slate-400 dark:text-slate-600' : 'text-slate-400 dark:text-slate-500'} />}
            {label && <span className={`text-sm font-medium ${disabled ? 'text-slate-500' : 'text-slate-900 dark:text-slate-200'}`}>{label}</span>}
          </div>
          <FieldDescription
            as="span"
            id={`${switchId}-hint`}
            disabled={disabled}
            hidden={!!error}
            className="mt-0.5"
          >
            {hint}
          </FieldDescription>
          <FieldError as="span" id={`${switchId}-error`} className="mt-0.5">
            {error}
          </FieldError>
        </div>
      )}

      <div className="relative flex items-center shrink-0">
        <input
          ref={ref}
          id={switchId}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="peer sr-only"
          aria-invalid={!!error}
          aria-describedby={error ? `${switchId}-error` : hint ? `${switchId}-hint` : undefined}
          {...props}
        />
        <div className={`h-6 w-11 rounded-full transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white dark:peer-focus-visible:ring-offset-slate-950 ${
          disabled ? 'bg-slate-200 dark:bg-slate-900 border-slate-300 dark:border-white/5' :
          error
            ? 'bg-red-100 dark:bg-red-950/50 peer-checked:bg-red-500 border border-red-500/30 peer-focus-visible:ring-red-500/50'
            : 'bg-slate-200 dark:bg-slate-800 peer-checked:bg-cyan-500 border border-slate-300 dark:border-white/10 peer-checked:border-cyan-400 peer-focus-visible:ring-cyan-500/50'
        }`}></div>
        <div className={`absolute left-1 top-1 h-4 w-4 rounded-full transition-transform peer-checked:translate-x-5 shadow-sm ${
          disabled ? (checked ? 'bg-slate-400' : 'bg-slate-500') : (checked ? 'bg-white' : 'bg-white dark:bg-slate-300')
        } ${error && !checked ? 'bg-red-200' : ''}`}></div>
      </div>
    </label>
  );

  if (inline) {
    return (
      <FieldWrapper
        inline
        disabled={disabled}
        className={className}
        inlineClassName="flex-col gap-2 sm:flex-row sm:items-center sm:gap-4"
        disabledClassName="opacity-50 cursor-not-allowed"
      >
        <FieldLabel
          htmlFor={switchId}
          inline
          disabled={disabled}
          inlineClassName="sm:min-w-[120px] sm:shrink-0"
        >
          {label}
        </FieldLabel>
        {content}
      </FieldWrapper>
    );
  }

  return (
    <FieldWrapper
      disabled={disabled}
      className={className}
      disabledClassName="opacity-50 cursor-not-allowed"
    >
      {content}
    </FieldWrapper>
  );
});

SwitchField.displayName = 'SwitchField';
