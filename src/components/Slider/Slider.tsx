import { ChangeEvent, useEffect } from "react";

import { iSlider } from "../../interfaces/iSlider";

import "./Slider.scss";

/**
 * Slider Component
 * Component that renders a slider input with a numeric input field. The component
 * takes in min, max, value, and onChange from its parent component.
 *
 * @param {number} min - The minimum value for user input
 * @param {number} max - The maximum value for user input
 * @param {number} value - Current user input value
 * @param {function} onChange - Change event handler
 * @returns {JSX.Element} - The rendered slider component
 * @example <Slider min={0} max={100} value={50} onChange={(val) => handleSliderChange(val)} />
 */
const Slider = ({ min, max, value, onChange }: iSlider): JSX.Element => {
  // If the value is greater than the maximum value,
  // set the value to be the maximum value
  useEffect(() => {
    if (value > max) onChange(max);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [max]);

  return (
    <div className="slider">
      <div className="slider__left">
        <span className="slider__label">{min}</span>
        <input
          id="slider"
          type="range"
          min={min}
          max={max}
          step="1"
          defaultValue={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            let val: number = Number(e.target.value);
            if (val < min) val = min; // Ensure value is not less than min value
            if (val > max) val = max; // Ensure value is not greater than max value
            onChange(val); // Call the onChange event handler with updated value
          }}
          className="slider__range-slider"
        />
        <span className="slider__label">{max}</span>
      </div>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          let val: number = Number(e.target.value);
          if (val < min) val = min; // Ensure value is not less than min value
          if (val > max) val = max; // Ensure value is not greater than max value
          onChange(val); // Call the onChange event handler with updated value
        }}
        className="slider__number-input"
      />
    </div>
  );
};

export default Slider;
