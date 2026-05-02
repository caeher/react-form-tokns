import { useId, forwardRef, InputHTMLAttributes, ElementType } from 'react';
import { Check as CheckIcon } from 'lucide-react';

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
  ...props 
}, ref) => {
  const generatedId = useId();
  const checkboxId = id || generatedId;

  const content = (
    <div className={`flex flex-col gap-1.5 ${inline ? 'flex-1' : ''}`}>
      <label htmlFor={checkboxId} className={`group relative flex items-start gap-3 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
        <div className="flex h-5 items-center">
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            disabled={disabled}
            className="peer sr-only"
            aria-invalid={!!error}
            aria-describedby={error ? `${checkboxId}-error` : hint ? `${checkboxId}-hint` : undefined}
            {...props}
          />
          <div className={`flex h-5 w-5 items-center justify-center rounded border bg-slate-900/50 transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-slate-950 peer-checked:[&_svg]:opacity-100 ${
            disabled ? 'border-white/5 opacity-50' :
            error
              ? 'border-red-500/50 peer-checked:border-red-500 peer-checked:bg-red-500 peer-focus-visible:ring-red-500/50'
              : 'border-white/20 group-hover:border-white/40 peer-checked:border-cyan-500 peer-checked:bg-cyan-500 peer-focus-visible:ring-cyan-500/50'
          }`}>
            <CheckIcon
              className="pointer-events-none h-3.5 w-3.5 opacity-0 transition-opacity text-slate-950"
              strokeWidth={4}
            />
          </div>
        </div>
        
        {(label || hint || Icon) && (
          <div className="flex flex-col">
            <div className={`flex items-center gap-2 ${iconPosition === 'right' ? 'flex-row-reverse justify-end' : ''}`}>
              {Icon && <Icon size={16} className={disabled ? 'text-slate-600' : 'text-slate-400'} />}
              {label && <span className={`text-sm font-medium ${disabled ? 'text-slate-500' : 'text-slate-200'}`}>{label}</span>}
            </div>
            {hint && !error && <span id={`${checkboxId}-hint`} className={`text-xs mt-0.5 ${disabled ? 'text-slate-600' : 'text-slate-400'}`}>{hint}</span>}
          </div>
        )}
      </label>
      
      {error && (
        <p id={`${checkboxId}-error`} className="text-xs font-medium text-red-400 pl-8">
          {error}
        </p>
      )}
    </div>
  );

  if (inline) {
    return (
      <div className={`flex items-start gap-4 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
        {label && (
          <span className={`text-sm font-medium pt-0.5 min-w-[120px] shrink-0 ${disabled ? 'text-slate-500' : 'text-slate-200'}`}>
            {label}
          </span>
        )}
        {content}
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-1.5 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      {content}
    </div>
  );
});

CheckboxField.displayName = 'CheckboxField';
