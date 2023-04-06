import { ChangeEvent } from "react";
import { iSlider } from "../../interfaces/iSlider";
import "./Slider.scss";

const Slider = ({ min, max, value, onChange }: iSlider) => {
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
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
          className="slider__range-slider"
        />
        <span className="slider__label">{max}</span>
      </div>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
        className="slider__number-input"
      />
    </div>
  );
};

export default Slider;
