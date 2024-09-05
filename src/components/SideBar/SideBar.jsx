import avatar from "../../assets/avatar.svg";
import "./SideBar.css";

const SideBar = () => {
  return (
    <div className="sidebar">
      <img src={avatar} alt="Default Avatar" className="sidebar__avatar" />
      <p className="sidebar__username">Terrence Tegegne</p>
    </div>
  );
};

export default SideBar;
