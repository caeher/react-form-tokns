import { useId, forwardRef, useState, useRef, useEffect, ClipboardEvent, KeyboardEvent, RefObject } from 'react';
import {
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldWrapper,
} from '../shared/form';

export interface InputOtpFieldProps {
  id?: string;
  name?: string;
  label?: string;
  hint?: string;
  error?: string;
  inline?: boolean;
  disabled?: boolean;
  className?: string;
  length?: 4 | 6;
  value?: string;
  onChange?: (event: { target: { name: string; value: string }; persist: () => void }) => void;
  autoFocus?: boolean;
}

export const InputOtpField = forwardRef<HTMLInputElement, InputOtpFieldProps>(({
  id,
  name,
  label,
  hint,
  error,
  inline = false,
  disabled = false,
  className = '',
  length = 6,
  value = '',
  onChange,
  autoFocus = false,
}, ref) => {
  const generatedId = useId();
  const otpId = id || generatedId;

  const [digits, setDigits] = useState<string[]>(() => {
    const arr = value.split('').slice(0, length);
    return [...arr, ...Array(length - arr.length).fill('')];
  });

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const arr = value.split('').slice(0, length);
    setDigits([...arr, ...Array(length - arr.length).fill('')]);
  }, [value, length]);

  const handleChange = (index: number, val: string) => {
    if (disabled) return;
    
    // Only allow digits
    const cleanVal = val.replace(/\D/g, '').slice(-1);
    const newDigits = [...digits];
    newDigits[index] = cleanVal;
    
    setDigits(newDigits);
    const fullValue = newDigits.join('');

    if (onChange) {
      onChange({
        target: { name: name || otpId, value: fullValue },
        persist: () => {},
      });
    }

    // Auto-advance
    if (cleanVal && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (disabled) return;

    const pastedData = e.clipboardData.getData('text/plain').replace(/\D/g, '').slice(0, length);
    const newDigits = [...digits];
    
    pastedData.split('').forEach((char, i) => {
      newDigits[i] = char;
    });

    setDigits(newDigits);
    const fullValue = newDigits.join('');

    if (onChange) {
      onChange({
        target: { name: name || otpId, value: fullValue },
        persist: () => {},
      });
    }

    // Focus last filled or last input
    const nextIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  const content = (
    <div className={`flex flex-col gap-1.5 ${inline ? 'flex-1' : ''}`}>
      <div className="flex items-center gap-1.5 sm:gap-2">
        {digits.map((digit, i) => (
          <div key={i} className="flex items-center">
            {i > 0 && i === length / 2 && (
              <div className="mx-0.5 h-px w-2 bg-slate-700 sm:mx-1 sm:w-3" />
            )}
            <input
              ref={(el) => {
                inputRefs.current[i] = el;
                if (i === 0 && typeof ref === 'function') ref(el);
                else if (i === 0 && ref && typeof ref === 'object')
                  (ref as RefObject<HTMLInputElement | null>).current = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              disabled={disabled}
              autoFocus={autoFocus && i === 0}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              className={`h-10 w-9 rounded-xl border bg-slate-900/50 text-center font-mono text-base font-semibold text-slate-50 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 sm:h-12 sm:w-12 sm:text-lg ${
                disabled ? 'border-white/5 cursor-not-allowed opacity-50' :
                error
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50'
                  : 'border-white/10 focus:border-cyan-400 focus:ring-cyan-500/50 hover:border-white/20'
              }`}
            />
          </div>
        ))}
      </div>
      <FieldDescription id={`${otpId}-hint`} disabled={disabled} hidden={!!error}>
        {hint}
      </FieldDescription>
      <FieldError id={`${otpId}-error`}>{error}</FieldError>
    </div>
  );

  return (
    <FieldWrapper
      inline={inline}
      disabled={disabled}
      className={className}
      disabledClassName="opacity-50"
    >
      <FieldLabel as="span" inline={inline} disabled={disabled}>
        {label}
      </FieldLabel>
      {content}
    </FieldWrapper>
  );
});

InputOtpField.displayName = 'InputOtpField';
