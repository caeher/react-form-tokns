import { useId, forwardRef, useState, SelectHTMLAttributes, ElementType, ReactNode, ChangeEvent } from 'react';
import { Popover } from '../ui/Popover';
import {
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldWrapper,
} from '../shared/form';
import { fieldControlHeightClass, getFieldSurfaceClass } from './utils/fieldStyles';

export interface SelectOption {
  label: string;
  value: string | number;
  icon?: ElementType;
  image?: string;
}

export interface SelectFieldProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'value'> {
  label?: string;
  hint?: string;
  error?: string;
  options?: SelectOption[];
  inline?: boolean;
  value?: string | number;
  matchTriggerWidth?: boolean;
  disabled?: boolean;
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(({ 
  id, 
  label, 
  hint, 
  error, 
  options = [], 
  className = '', 
  inline = false,
  onChange, 
  value, 
  matchTriggerWidth = true,
  disabled = false,
  ...props 
}, ref) => {
  const generatedId = useId();
  const selectId = id || generatedId;
  const [internalValue, setInternalValue] = useState<string | number>(value ?? '');

  const currentValue = value !== undefined ? value : internalValue;
  const selectedOption = options.find(opt => opt.value === currentValue);

  const handleSelect = (val: string | number) => {
    if (disabled) return;
    setInternalValue(val);
    if (onChange) {
      const event = {
        target: { value: val, name: props.name || selectId },
        currentTarget: { value: val, name: props.name || selectId },
        persist: () => {},
      } as unknown as ChangeEvent<HTMLSelectElement>;
      onChange(event);
    }
  };

  const renderOption = (option: SelectOption): ReactNode => (
    <div className="flex items-center gap-2.5 overflow-hidden">
      {option.icon && (
        <option.icon size={16} className={`${disabled ? 'text-slate-300 dark:text-slate-700' : 'text-slate-500 dark:text-slate-400'} shrink-0`} />
      )}
      {option.image && (
        <img src={option.image} alt="" className="h-4 w-4 rounded-full object-cover shrink-0" />
      )}
      <span className="truncate">{option.label}</span>
    </div>
  );

  const selectContent = (
    <div className={`flex flex-col gap-1.5 ${inline ? 'flex-1' : ''}`}>
      <div className="relative" onMouseDown={(e) => e.stopPropagation()}>
        <Popover
          matchTriggerWidth={matchTriggerWidth}
          disabled={disabled}
          trigger={
            <div
              className={`w-full flex items-center justify-between rounded-xl px-4 py-2.5 text-sm ${
                disabled ? 'pointer-events-none' : 'cursor-pointer'
              } ${fieldControlHeightClass} ${getFieldSurfaceClass({
                disabled,
                error: !!error,
                focusMode: 'group-focus',
              })}`}
            >
              <div className={`flex-1 overflow-hidden ${selectedOption ? (disabled ? 'text-slate-400 dark:text-slate-600' : 'text-slate-900 dark:text-slate-100') : 'text-slate-400 dark:text-slate-500'}`}>
                {selectedOption ? renderOption(selectedOption) : 'Select option...'}
              </div>
              <svg className={`h-4 w-4 fill-current shrink-0 ml-2 ${disabled ? 'text-slate-300 dark:text-slate-700' : 'text-slate-500 dark:text-slate-400'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          }
          content={(close) => (
            <div className="py-1 max-h-60 overflow-y-auto custom-scrollbar">
              {options.map((option, index) => (
                <div
                  key={index}
                  className={`px-4 py-2 text-sm cursor-pointer transition-colors ${
                    currentValue === option.value
                      ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-50'
                  }`}
                  onClick={() => {
                    handleSelect(option.value);
                    close();
                  }}
                >
                  {renderOption(option)}
                </div>
              ))}
              {options.length === 0 && (
                <div className="px-4 py-2 text-sm text-slate-500 italic">
                  No options available
                </div>
              )}
            </div>
          )}
        />

        <select
          ref={ref}
          id={selectId}
          value={currentValue}
          disabled={disabled}
          onChange={(e) => handleSelect(e.target.value)}
          className="sr-only"
          aria-invalid={!!error}
          aria-describedby={error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined}
          {...props}
        >
          <option value="">Select option...</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <FieldDescription id={`${selectId}-hint`} disabled={disabled} hidden={!!error}>
        {hint}
      </FieldDescription>
      <FieldError id={`${selectId}-error`}>{error}</FieldError>
    </div>
  );

  return (
    <FieldWrapper inline={inline} disabled={disabled} className={className}>
      <FieldLabel htmlFor={selectId} inline={inline} disabled={disabled}>
        {label}
      </FieldLabel>
      {selectContent}
    </FieldWrapper>
  );
});

SelectField.displayName = 'SelectField';
