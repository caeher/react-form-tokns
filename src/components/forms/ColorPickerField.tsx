import { useId, forwardRef, useState, useEffect, MouseEvent as ReactMouseEvent } from 'react';
import { Popover } from '../ui/Popover';
import {
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldWrapper,
} from '../shared/form';
import { 
  ColorFormat, 
  rgbToHsv, 
  hsvToRgb, 
  formatColor, 
  parseColor, 
  rgbToHex 
} from './utils/colorConversions';
import { getFieldSurfaceClass } from './utils/fieldStyles';

export interface ColorPickerFieldProps {
  id?: string;
  name?: string;
  label?: string;
  hint?: string;
  error?: string;
  inline?: boolean;
  disabled?: boolean;
  className?: string;
  value?: string;
  onChange?: (event: { target: { name: string; value: string }; persist: () => void }) => void;
  format?: ColorFormat;
  presets?: string[];
  showInput?: boolean;
}

export const ColorPickerField = forwardRef<HTMLInputElement, ColorPickerFieldProps>(({
  id,
  name,
  label,
  hint,
  error,
  inline = false,
  disabled = false,
  className = '',
  value = '#06b6d4',
  onChange,
  format = 'hex',
  presets = ['#ef4444', '#f97316', '#f59e0b', '#10b981', '#06b6d4', '#3b82f6', '#6366f1', '#a855f7', '#ec4899', '#ffffff', '#000000'],
  showInput = true,
}, ref) => {
  const generatedId = useId();
  const colorId = id || generatedId;

  const [internalColor, setInternalColor] = useState(value);
  const currentColor = value !== undefined ? value : internalColor;

  const parsed = parseColor(currentColor) || { r: 6, g: 182, b: 212, a: 1 };
  const [h, s, v] = rgbToHsv(parsed.r, parsed.g, parsed.b);
  const [hsv, setHsv] = useState({ h, s, v, a: parsed.a });

  useEffect(() => {
    const p = parseColor(currentColor);
    if (p) {
      const [newH, newS, newV] = rgbToHsv(p.r, p.g, p.b);
      setHsv({ h: newH, s: newS, v: newV, a: p.a });
    }
  }, [currentColor]);

  const updateColor = (newHsv: typeof hsv) => {
    setHsv(newHsv);
    const [r, g, b] = hsvToRgb(newHsv.h, newHsv.s, newHsv.v);
    const formatted = formatColor(r, g, b, newHsv.a, format);
    setInternalColor(formatted);
    if (onChange) {
      onChange({
        target: { name: name || colorId, value: formatted },
        persist: () => {},
      });
    }
  };

  const handleSaturationPointer = (e: ReactMouseEvent | PointerEvent) => {
    if (disabled) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, 1 - (e.clientY - rect.top) / rect.height));
    updateColor({ ...hsv, s: x, v: y });
  };

  const handleHuePointer = (e: ReactMouseEvent | PointerEvent) => {
    if (disabled) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    updateColor({ ...hsv, h: x });
  };

  const handleAlphaPointer = (e: ReactMouseEvent | PointerEvent) => {
    if (disabled) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    updateColor({ ...hsv, a: x });
  };

  const isAlphaFormat = ['hex-alpha', 'rgba', 'hsla'].includes(format);

  const colorContent = (
    <div className={`flex flex-col gap-1.5 ${inline ? 'flex-1' : ''}`}>
      <Popover
        matchTriggerWidth={false}
        disabled={disabled}
        trigger={
          <div
            className={`w-full flex items-center gap-3 rounded-xl px-3 py-2 text-sm ${
              disabled ? 'pointer-events-none' : 'cursor-pointer'
            } ${getFieldSurfaceClass({
              disabled,
              error: !!error,
              focusMode: 'group-focus',
            })}`}
          >
            <div 
              className="h-6 w-10 rounded-lg border border-white/10 checkerboard-bg relative overflow-hidden shrink-0"
            >
              <div 
                className="absolute inset-0" 
                style={{ backgroundColor: currentColor }} 
              />
            </div>
            {showInput && (
              <span className={`min-w-0 truncate font-mono ${disabled ? 'text-slate-500' : 'text-slate-200'}`}>
                {currentColor}
              </span>
            )}
          </div>
        }
        content={() => (
          <div className="flex w-[min(240px,calc(100vw-2rem))] flex-col gap-4 p-4 select-none">
            {/* Saturation/Value Area */}
            <div 
              className="relative h-40 w-full rounded-lg cursor-crosshair overflow-hidden"
              style={{ backgroundColor: `hsl(${hsv.h * 360}, 100%, 50%)` }}
              onPointerDown={(e) => {
                (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
                handleSaturationPointer(e);
              }}
              onPointerMove={(e) => {
                if (e.buttons === 1) handleSaturationPointer(e);
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
              <div 
                className="absolute h-3 w-3 rounded-full border-2 border-white shadow-md -translate-x-1/2 translate-y-1/2 pointer-events-none"
                style={{ left: `${hsv.s * 100}%`, bottom: `${hsv.v * 100}%` }}
              />
            </div>

            {/* Hue Slider */}
            <div className="flex flex-col gap-1.5">
              <div 
                className="relative h-3 w-full rounded-full cursor-pointer"
                style={{ background: 'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)' }}
                onPointerDown={(e) => {
                  (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
                  handleHuePointer(e);
                }}
                onPointerMove={(e) => {
                  if (e.buttons === 1) handleHuePointer(e);
                }}
              >
                <div 
                  className="absolute h-4 w-4 rounded-full border-2 border-white shadow-md top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none"
                  style={{ left: `${hsv.h * 100}%` }}
                />
              </div>
            </div>

            {/* Alpha Slider */}
            {isAlphaFormat && (
              <div className="flex flex-col gap-1.5">
                <div 
                  className="relative h-3 w-full rounded-full cursor-pointer checkerboard-bg overflow-hidden"
                  onPointerDown={(e) => {
                    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
                    handleAlphaPointer(e);
                  }}
                  onPointerMove={(e) => {
                    if (e.buttons === 1) handleAlphaPointer(e);
                  }}
                >
                  <div 
                    className="absolute inset-0"
                    style={{ 
                      background: `linear-gradient(to right, transparent, ${rgbToHex(...hsvToRgb(hsv.h, hsv.s, hsv.v))})` 
                    }}
                  />
                  <div 
                    className="absolute h-4 w-4 rounded-full border-2 border-white shadow-md top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none"
                    style={{ left: `${hsv.a * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Presets */}
            {presets.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                {presets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    className="h-5 w-5 rounded-full border border-white/10 transition-transform hover:scale-125"
                    style={{ backgroundColor: preset }}
                    onClick={() => {
                      const p = parseColor(preset);
                      if (p) {
                        const [newH, newS, newV] = rgbToHsv(p.r, p.g, p.b);
                        updateColor({ h: newH, s: newS, v: newV, a: p.a });
                      }
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      />

      <input
        ref={ref}
        type="hidden"
        name={name}
        disabled={disabled}
        value={currentColor}
      />

      <FieldDescription id={`${colorId}-hint`} disabled={disabled} hidden={!!error}>
        {hint}
      </FieldDescription>
      <FieldError id={`${colorId}-error`}>{error}</FieldError>
    </div>
  );

  return (
    <FieldWrapper
      inline={inline}
      disabled={disabled}
      className={className}
      disabledClassName="opacity-50"
    >
      <FieldLabel htmlFor={colorId} inline={inline} disabled={disabled}>
        {label}
      </FieldLabel>
      {colorContent}
    </FieldWrapper>
  );
});

ColorPickerField.displayName = 'ColorPickerField';
