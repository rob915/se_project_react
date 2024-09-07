import { Link } from "react-router-dom";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const userName = "Terrence Tegegne";

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="Header logo" className="header__logo" />
      </Link>
      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>
      <Link to="/profile" className="header__link">
        <div className="header__user-container">
          <p className="header__user-name">{userName}</p>
          {avatar ? (
            <img
              src={avatar}
              alt="Terrence Tegegne"
              className="header__avatar"
            />
          ) : (
            <span className="header__avatar header__avatar_none">
              {userName?.toUpperCase().charAt(0) || ""}
            </span>
          )}
        </div>
      </Link>
    </header>
  );
}

export default Header;
