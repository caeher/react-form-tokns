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
    <div className={`flex items-center justify-between gap-3 w-full ${inline ? '' : `rounded-xl border border-white/5 bg-slate-900/30 p-3 transition-colors ${disabled ? '' : 'hover:bg-slate-900/50'}`}`}>
      {(label || hint || Icon) && (
        <div className="flex flex-col">
          <div className={`flex items-center gap-2 ${iconPosition === 'right' ? 'flex-row-reverse justify-end' : ''}`}>
            {Icon && <Icon size={16} className={disabled ? 'text-slate-600' : 'text-slate-400'} />}
            {label && <span className={`text-sm font-medium ${disabled ? 'text-slate-500' : 'text-slate-200'}`}>{label}</span>}
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
        <div className={`h-6 w-11 rounded-full transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-slate-950 ${
          disabled ? 'bg-slate-900 border-white/5' :
          error
            ? 'bg-red-950/50 peer-checked:bg-red-500 border border-red-500/30 peer-focus-visible:ring-red-500/50'
            : 'bg-slate-800 peer-checked:bg-cyan-500 border border-white/10 peer-checked:border-cyan-400 peer-focus-visible:ring-cyan-500/50'
        }`}></div>
        <div className={`absolute left-1 top-1 h-4 w-4 rounded-full transition-transform peer-checked:translate-x-5 shadow-sm ${
          disabled ? (checked ? 'bg-slate-600' : 'bg-slate-700') : (checked ? 'bg-white' : 'bg-slate-300')
        } ${error && !checked ? 'bg-red-200' : ''}`}></div>
      </div>
    </div>
  );

  if (inline) {
    return (
      <FieldWrapper
        inline
        disabled={disabled}
        className={className}
        inlineClassName="items-center gap-4"
        disabledClassName="opacity-50 cursor-not-allowed"
      >
        <FieldLabel
          as="span"
          inline
          disabled={disabled}
          inlineClassName="min-w-[120px] shrink-0"
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
      <label htmlFor={switchId} className={disabled ? 'cursor-not-allowed' : 'cursor-pointer'}>
        {content}
      </label>
    </FieldWrapper>
  );
});

SwitchField.displayName = 'SwitchField';
