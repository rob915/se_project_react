import "./ModalWithForm.css";

function ModalWithForm({
  isOpen,
  children,
  buttonText,
  title,
  onClose,
  onSubmit,
  clickCloseModal,
}) {
  return (
    <div
      onClick={clickCloseModal}
      className={`modal ${isOpen ? "modal_opened" : ""}`}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        <form
          className="modal__form"
          onSubmit={(e) => {
            onSubmit(e);
          }}
        >
          {children}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
