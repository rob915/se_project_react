import React, { useContext, useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const EditProfileModal = ({
  closeActiveModal,
  isOpen,
  clickCloseModal,
  onEditProfileModalSubmit,
}) => {
  const { currentUser } = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  useEffect(() => {
    setName(currentUser.name ?? "");
    setAvatar(currentUser.avatar ?? "");
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onEditProfileModalSubmit(name, avatar)
      .then(() => {
        setName("");
        setAvatar("");
      })
      .catch((err) => {
        console.error(err);
        alert("Could not update profile");
      });
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Sign up"
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
      clickCloseModal={clickCloseModal}
    >
      <label htmlFor="name" className="modal__label">
        Name{""}
        <input
          type="text"
          className="modal__input modal__input-imageUrl"
          name="name"
          placeholder="Name"
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label htmlFor="avatarUrl" className="modal__label">
        Avatar URL{" "}
        <input
          type="url"
          className="modal__input modal__input-imageUrl"
          name="avatar"
          placeholder="Avatar"
          onChange={handleAvatarChange}
          value={avatar}
        />
      </label>

      <button>Submit</button>
    </ModalWithForm>
  );
};

export default EditProfileModal;
