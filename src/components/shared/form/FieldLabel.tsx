import type { HTMLAttributes, ReactNode } from 'react';

type FieldLabelElement = 'label' | 'span' | 'div';

export interface FieldLabelProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  as?: FieldLabelElement;
  children?: ReactNode;
  inline?: boolean;
  disabled?: boolean;
  className?: string;
  inlineClassName?: string;
  htmlFor?: string;
}

export function FieldLabel({
  as = 'label',
  children,
  inline = false,
  disabled = false,
  className = '',
  inlineClassName = 'pt-0 sm:pt-2.5 sm:min-w-[120px] sm:shrink-0',
  htmlFor,
  ...props
}: FieldLabelProps) {
  if (!children) {
    return null;
  }

  const Component = as;
  const componentProps = as === 'label' ? { ...props, htmlFor } : props;

  return (
    <Component
      {...componentProps}
      className={`text-sm font-medium ${
        disabled ? 'text-slate-500' : 'text-slate-200'
      } ${inline ? inlineClassName : ''} ${inline ? 'w-full min-w-0' : ''} ${className}`}
    >
      {children}
    </Component>
  );
}
