import "./ItemModal.css";

function ItemModal({ isOpen, onClose, card, handleDeleteCard }) {
  return (
    <div
      onClick={(e) => {
        if (
          e.target.classList.contains("modal_opened") ||
          e.target.classList.contains("modal__close")
        ) {
          onClose();
        }
      }}
      className={`modal ${isOpen ? "modal_opened" : ""}`}
    >
      <div className="modal__content modal__content_type_image">
        <button
          // onClick={onClose}
          type="button"
          className="modal__close modal__close_image"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__footer-container">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <button
            onClick={() => handleDeleteCard(card)}
            className="modal__card_delete-button"
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
