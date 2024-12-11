import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

const RegisterModal = ({
  closeActiveModal,
  isOpen,
  clickCloseModal,
  onRegisterModalSubmit,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onRegisterModalSubmit(name, email, password, avatar)
      .then(() => {
        setName("");
        setEmail("");
        setPassword("");
        setAvatar("");
      })
      .catch((err) => {
        console.error(err);
        alert("Could not register");
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
      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          type="email"
          className="modal__input"
          name="email"
          placeholder="Email"
          onChange={handleEmailChange}
          value={email}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password*{" "}
        <input
          type="password"
          className="modal__input modal__input-imageUrl"
          name="password"
          placeholder="password"
          onChange={handlePasswordChange}
          value={password}
        />
      </label>
      <label htmlFor="name" className="modal__label">
        Name{" "}
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

      <button>Next</button>
      <button type="button"> or Log in</button>
    </ModalWithForm>
  );
};

export default RegisterModal;
