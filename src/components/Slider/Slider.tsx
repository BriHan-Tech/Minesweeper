import { ChangeEvent, useEffect } from "react";
import { iSlider } from "../../interfaces/iSlider";
import "./Slider.scss";

const Slider = ({ min, max, value, onChange }: iSlider) => {
  // If the value is greater than the maximum value,
  // set the value to be the maximum value
  useEffect(() => {
    if (value > max) onChange(max);
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
            if (val < min) val = min;
            if (val > max) val = max;
            onChange(val);
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
          if (val < min) val = min;
          if (val > max) val = max;
          onChange(val);
        }}
        className="slider__number-input"
      />
    </div>
  );
};

export default Slider;
