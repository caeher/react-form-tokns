import { useId, forwardRef, TextareaHTMLAttributes, ElementType } from 'react';

export interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  inline?: boolean;
  icon?: ElementType;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
}

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(({ 
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
  const textareaId = id || generatedId;

  const inputContent = (
    <div className={`flex flex-col gap-1.5 ${inline ? 'flex-1' : ''}`}>
      <div className="relative">
        {Icon && (
          <div className={`absolute pointer-events-none ${
            disabled ? 'text-slate-600' : 'text-slate-400'
          } ${
            iconPosition === 'left' ? 'left-3 top-3' : 'right-3 top-3'
          }`}>
            <Icon size={18} />
          </div>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          className={`w-full min-h-[100px] resize-y rounded-xl border bg-slate-900/50 px-4 py-2.5 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 transition-all custom-scrollbar ${
            disabled ? 'cursor-not-allowed border-white/5' :
            error
              ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50'
              : 'border-white/10 focus:border-cyan-400 focus:ring-cyan-500/50 hover:border-white/20'
          } ${Icon && iconPosition === 'left' ? 'pl-10' : ''} ${Icon && iconPosition === 'right' ? 'pr-10' : ''}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined}
          {...props}
        />
      </div>
      {hint && !error && (
        <p id={`${textareaId}-hint`} className="text-xs text-slate-400">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${textareaId}-error`} className="text-xs font-medium text-red-400">
          {error}
        </p>
      )}
    </div>
  );

  return (
    <div className={`flex ${inline ? 'items-start gap-4' : 'flex-col gap-1.5'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      {label && (
        <label htmlFor={textareaId} className={`text-sm font-medium ${disabled ? 'text-slate-500' : 'text-slate-200'} ${inline ? 'pt-2.5 min-w-[120px] shrink-0' : ''}`}>
          {label}
        </label>
      )}
      {inputContent}
    </div>
  );
});

TextareaField.displayName = 'TextareaField';
