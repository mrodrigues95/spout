import { ComponentProps } from 'react';

export interface PhotoEditorSliderProps
  extends Omit<ComponentProps<'input'>, 'value' | 'onChange'> {
  value: number;
  onChange(value: number): void;
}

export const PhotoEditorSlider = ({
  value,
  onChange,
  ...props
}: PhotoEditorSliderProps) => {
  return (
    <input
      type="range"
      name="zoom"
      aria-orientation="horizontal"
      aria-label="Zoom"
      aria-valuemin={1}
      aria-valuemax={2}
      aria-valuenow={value}
      min={1}
      max={2}
      step={0.01}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      {...props}
    />
  );
};
