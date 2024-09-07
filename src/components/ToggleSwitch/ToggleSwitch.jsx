import React, { useContext, useState } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label htmlFor="switch-input" className="switch__label">
      <input
        type="checkbox"
        className="switch__input"
        onChange={handleToggleSwitchChange}
        id="switch-input"
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
