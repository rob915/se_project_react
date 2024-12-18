import { Link } from "react-router-dom";
import { useContext } from "react";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";
import logo from "../../assets/logo.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Avatar from "../Avatar/Avatar";

function Header({ handleAddClick, weatherData, onSignUpClick, onLoginClick }) {
  const { isLoggedIn, currentUser } = useContext(CurrentUserContext);
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
      {!isLoggedIn && (
        <>
          <button
            className="header__button"
            type="button"
            onClick={onSignUpClick}
          >
            Sign up
          </button>
          <button
            className="header__button"
            type="button"
            onClick={onLoginClick}
          >
            Log in
          </button>
        </>
      )}
      {isLoggedIn && (
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__user-name">{currentUser.name}</p>
              <Avatar />
            </div>
          </Link>
        </>
      )}
    </header>
  );
}

export default Header;
