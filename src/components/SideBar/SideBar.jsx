import avatar from "../../assets/avatar.svg";
import Avatar from "../Avatar/Avatar";
import "./SideBar.css";

const SideBar = () => {
  return (
    <div className="sidebar">
      <Avatar size={"100px"} />
      <p className="sidebar__username">Terrence Tegegne</p>
    </div>
  );
};

export default SideBar;
