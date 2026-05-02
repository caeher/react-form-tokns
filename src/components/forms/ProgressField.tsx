import { useId } from 'react';

export interface ProgressFieldProps {
  id?: string;
  label?: string;
  hint?: string;
  error?: string;
  inline?: boolean;
  disabled?: boolean;
  className?: string;
  value?: number;
  max?: number;
  showValue?: boolean;
  variant?: 'default' | 'gradient' | 'striped';
  size?: 'sm' | 'md' | 'lg';
  color?: 'cyan' | 'green' | 'amber' | 'red';
}

export const ProgressField = ({
  id,
  label,
  hint,
  error,
  inline = false,
  disabled = false,
  className = '',
  value = 0,
  max = 100,
  showValue = true,
  variant = 'default',
  size = 'md',
  color = 'cyan',
}: ProgressFieldProps) => {
  const generatedId = useId();
  const progressId = id || generatedId;

  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const colorClasses = {
    cyan: 'bg-cyan-500',
    green: 'bg-emerald-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
  };

  const gradientClasses = {
    cyan: 'bg-gradient-to-r from-cyan-600 to-cyan-400',
    green: 'bg-gradient-to-r from-emerald-600 to-emerald-400',
    amber: 'bg-gradient-to-r from-amber-600 to-amber-400',
    red: 'bg-gradient-to-r from-red-600 to-red-400',
  };

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const barContent = (
    <div className={`flex flex-col gap-1.5 ${inline ? 'flex-1' : ''}`}>
      <div className="flex items-center gap-3">
        <div 
          className={`relative flex-1 ${sizeClasses[size]} rounded-full bg-slate-800 border border-white/5 overflow-hidden`}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        >
          <div 
            className={`absolute top-0 left-0 h-full transition-all duration-500 ease-out ${
              variant === 'gradient' ? gradientClasses[color] : colorClasses[color]
            } ${variant === 'striped' ? 'progress-striped' : ''}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {showValue && (
          <span className="text-xs font-mono font-medium text-slate-400 min-w-[3ch] text-right">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
      {hint && !error && (
        <p id={`${progressId}-hint`} className="text-xs text-slate-400">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${progressId}-error`} className="text-xs font-medium text-red-400">
          {error}
        </p>
      )}
    </div>
  );

  return (
    <div className={`flex ${inline ? 'items-start gap-4' : 'flex-col gap-1.5'} ${disabled ? 'opacity-50' : ''} ${className}`}>
      {label && (
        <label className={`text-sm font-medium ${disabled ? 'text-slate-500' : 'text-slate-200'} ${inline ? 'pt-0.5 min-w-[120px] shrink-0' : ''}`}>
          {label}
        </label>
      )}
      {barContent}
    </div>
  );
};
