import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Avatar.css";

export default function Avatar({ size = "40px" }) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <>
      {currentUser.avatar ? (
        <img
          src={currentUser.avatar}
          alt="Terrence Tegegne"
          className="avatar"
          style={{ width: `${size}` }}
        />
      ) : (
        <span style={{ width: `${size}` }} className="avatar avatar_none">
          {userName?.toUpperCase().charAt(0) || ""}
        </span>
      )}
    </>
  );
}
