import type { HTMLAttributes, ReactNode } from 'react';

type FieldErrorElement = 'p' | 'span' | 'div';

export interface FieldErrorProps extends HTMLAttributes<HTMLParagraphElement> {
  as?: FieldErrorElement;
  children?: ReactNode;
}

export function FieldError({
  as = 'p',
  children,
  className = '',
  ...props
}: FieldErrorProps) {
  if (!children) {
    return null;
  }

  const Component = as;

  return (
    <Component {...props} className={`text-xs font-medium text-red-400 ${className}`}>
      {children}
    </Component>
  );
}
