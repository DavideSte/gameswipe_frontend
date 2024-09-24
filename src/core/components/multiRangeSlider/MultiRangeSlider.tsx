import { ChangeEvent, useCallback, useEffect, useState, useRef } from "react";
import "./multiRangeSlider.css";

interface MultiRangeSliderProps {
  min: number;
  max: number;
  startingMin?: number;
  startingMax?: number;
  onChange: (min: number, max: number) => void;
}

export default function MultiRangeSlider({
  min,
  max,
  onChange,
  startingMin,
  startingMax,
}: MultiRangeSliderProps) {
  const [minVal, setMinVal] = useState(startingMin || min);
  const [maxVal, setMaxVal] = useState(startingMax || max);
  const range = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // reverse getPercent
  const getValue = useCallback(
    (percent: number) => {
      return Math.round((percent / 100) * (max - min) + min);
    },
    [min, max]
  );

  useEffect(() => {
    if (range.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(maxVal);
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, maxVal, getPercent]);

  const handleMinChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(+event.target.value, maxVal - 1);
    setMinVal(value);
    onChange(value, maxVal);
  };

  const handleMaxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(+event.target.value, minVal + 1);
    setMaxVal(value);
    onChange(minVal, value);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // get the click position % relative to the slider
    const clickX = e.clientX - e.currentTarget.getBoundingClientRect().left;
    const percent = (clickX / e.currentTarget.offsetWidth) * 100;
    const value = getValue(percent);
    if (Math.abs(value - minVal) < Math.abs(value - maxVal)) {
      setMinVal(value);
      onChange(value, maxVal);
    } else {
      setMaxVal(value);
      onChange(minVal, value);
    }
  };

  return (
    <div className="h-fit flex justify-center items-center  w-full bg-white/10">
      <div className="relative w-full bg-white/20">
        <div
          onClick={handleClick}
          className="absolute h-2 rounded-full bg-blue-100 w-full z-[1]"
        ></div>
        <div
          className="absolute h-2 rounded-full bg-blue-500 z-[2] pointer-events-none"
          ref={range}
        ></div>
        <div className="absolute pt-5 px-4 text-xs text-color1 font-semibold flex w-full justify-between">
          <div className="">{minVal}</div>
          <div className="">{maxVal}</div>
        </div>

        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={handleMinChange}
          className={`thumb ${minVal > max - 100 ? "z-[5]" : "z-[3]"}`}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={handleMaxChange}
          className="thumb z-[4]"
        />
      </div>
    </div>
  );
}
