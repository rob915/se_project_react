import React, { useContext, useState } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  // const [currentTemperatureUnit, handleToggleSwitchChange] = useState("C");

  // const handleChange = (e) => {
  //   if (currentTemperatureUnit === "C") handleToggleSwitchChange("F");
  //   if (currentTemperatureUnit === "F") handleToggleSwitchChange("C");
  // };

  // console.log(currentTemperatureUnit);

  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  console.log(`ToggleSwitch value - ${currentTemperatureUnit}`);

  return (
    <label className="switch__label">
      <input
        type="checkbox"
        className="switch__input"
        onChange={handleToggleSwitchChange}
      />
      <span
        className={
          currentTemperatureUnit === "F"
            ? "switch__slider switch__slider-F"
            : "switch__slider switch__slider-C"
        }
      ></span>
      <p
        className={`switch__temp switch__temp-F ${
          currentTemperatureUnit === "F" && "switch_active"
        }`}
      >
        F
      </p>
      <p
        className={`switch__temp switch__temp-C ${
          currentTemperatureUnit === "C" && "switch_active"
        }`}
      >
        C
      </p>
    </label>
  );
};

export default ToggleSwitch;
