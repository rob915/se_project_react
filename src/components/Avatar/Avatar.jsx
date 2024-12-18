import { useContext, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Avatar.css";

export default function Avatar({ size = "40px" }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [urlBroken, setUrlBroken] = useState(false);

  return (
    <>
      {currentUser.avatar && !urlBroken ? (
        <img
          src={currentUser.avatar}
          alt="Terrence Tegegne"
          className="avatar"
          style={{ width: `${size}` }}
          onError={() => {
            console.log("the image url is broken");
            setUrlBroken(true);
          }}
        />
      ) : (
        <span style={{ width: `${size}` }} className="avatar avatar_none">
          {currentUser.name?.toUpperCase().charAt(0) || ""}
        </span>
      )}
    </>
  );
}
