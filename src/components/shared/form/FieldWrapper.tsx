import { forwardRef, type HTMLAttributes, type PropsWithChildren } from 'react';

export interface FieldWrapperProps
  extends PropsWithChildren,
    Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  inline?: boolean;
  disabled?: boolean;
  inlineClassName?: string;
  stackedClassName?: string;
  disabledClassName?: string;
}

export const FieldWrapper = forwardRef<HTMLDivElement, FieldWrapperProps>(function FieldWrapper(
  {
    inline = false,
    disabled = false,
    className = '',
    inlineClassName = 'items-start gap-4',
    stackedClassName = 'flex-col gap-1.5',
    disabledClassName = 'opacity-50 cursor-not-allowed',
    children,
    ...props
  },
  ref
) {
  return (
    <div
      ref={ref}
      {...props}
      className={`flex ${inline ? inlineClassName : stackedClassName} ${
        disabled ? disabledClassName : ''
      } ${className}`}
    >
      {children}
    </div>
  );
});
