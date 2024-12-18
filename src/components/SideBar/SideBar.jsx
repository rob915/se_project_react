import { useContext } from "react";
import avatar from "../../assets/avatar.svg";
import Avatar from "../Avatar/Avatar";
import "./SideBar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const SideBar = ({ onEditProfileClick, onLogoutClick }) => {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <div className="sidebar__profile-info-wrapper">
        <Avatar size={"100px"} />
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <button
        type="button"
        className="sidebar__profile-button sidebar__profile-button-edit"
        onClick={onEditProfileClick}
      >
        Change profile data
      </button>
      <button
        type="button"
        className="sidebar__profile-button"
        onClick={onLogoutClick}
      >
        Log out
      </button>
    </div>
  );
};

export default SideBar;
