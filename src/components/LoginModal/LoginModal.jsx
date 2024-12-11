import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

const LoginModal = ({
  closeActiveModal,
  isOpen,
  clickCloseModal,
  onLoginModalSubmit,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginModalSubmit(email, password)
      .then(() => {
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        console.error(err);
        alert("Could not login");
      });
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Login"
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
      clickCloseModal={clickCloseModal}
    >
      <label htmlFor="userId" className="modal__label">
        Email{" "}
        <input
          type="text"
          className="modal__input"
          name="userID"
          placeholder="Email"
          onChange={handleEmailChange}
          value={email}
        />
      </label>
      <label htmlFor="userPassword" className="modal__label">
        Password{" "}
        <input
          type="password"
          className="modal__input modal__input-imageUrl"
          name="userPassword"
          placeholder="Password"
          onChange={handlePasswordChange}
          value={password}
        />
      </label>

      <button>Next</button>
      <button type="button"> or Log in</button>
    </ModalWithForm>
  );
};

export default LoginModal;
