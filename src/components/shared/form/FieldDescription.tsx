import type { HTMLAttributes, ReactNode } from 'react';

type FieldDescriptionElement = 'p' | 'span' | 'div';

export interface FieldDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  as?: FieldDescriptionElement;
  children?: ReactNode;
  disabled?: boolean;
  hidden?: boolean;
}

export function FieldDescription({
  as = 'p',
  children,
  disabled = false,
  hidden = false,
  className = '',
  ...props
}: FieldDescriptionProps) {
  if (!children || hidden) {
    return null;
  }

  const Component = as;

  return (
    <Component
      {...props}
      className={`text-xs ${disabled ? 'text-slate-600' : 'text-slate-400'} ${className}`}
    >
      {children}
    </Component>
  );
}
