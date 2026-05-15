type FieldFocusMode = 'focus' | 'focus-within' | 'group-focus' | 'none';

interface FieldStateOptions {
  disabled?: boolean;
  error?: boolean;
  focusMode?: FieldFocusMode;
}

export const fieldControlHeightClass = 'min-h-[42px]';
export const fieldControlFixedHeightClass = 'h-[42px]';

const baseFieldSurface = 'border bg-white dark:bg-slate-950/40 transition-all';

const focusModeClasses: Record<FieldFocusMode, string> = {
  focus: 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-950',
  'focus-within': 'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-white dark:focus-within:ring-offset-slate-950',
  'group-focus': 'group-focus-visible:ring-2 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-white dark:group-focus-visible:ring-offset-slate-950',
  none: '',
};

const defaultFocusState: Record<FieldFocusMode, string> = {
  focus: 'focus:border-cyan-400 focus:ring-cyan-500/50',
  'focus-within': 'focus-within:border-cyan-400 focus-within:ring-cyan-500/50',
  'group-focus': 'group-focus-visible:border-cyan-400 group-focus-visible:ring-cyan-500/50',
  none: '',
};

const errorFocusState: Record<FieldFocusMode, string> = {
  focus: 'focus:border-red-500 focus:ring-red-500/50',
  'focus-within': 'focus-within:border-red-500 focus-within:ring-red-500/50',
  'group-focus': 'group-focus-visible:border-red-500 group-focus-visible:ring-red-500/50',
  none: '',
};

export function getFieldSurfaceClass({
  disabled = false,
  error = false,
  focusMode = 'focus',
}: FieldStateOptions) {
  if (disabled) {
    return `${baseFieldSurface} ${focusModeClasses[focusMode]} cursor-not-allowed border-slate-200 dark:border-white/5`;
  }

  if (error) {
    return `${baseFieldSurface} ${focusModeClasses[focusMode]} border-red-500/50 ${errorFocusState[focusMode]}`;
  }

  return `${baseFieldSurface} ${focusModeClasses[focusMode]} border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 ${defaultFocusState[focusMode]}`;
}

export function getFieldDividerClass({ disabled = false, error = false }: Omit<FieldStateOptions, 'focusMode'>) {
  if (disabled) {
    return 'border-slate-200 dark:border-slate-800';
  }

  if (error) {
    return 'border-red-500/50';
  }

  return 'border-slate-200 dark:border-slate-800';
}
