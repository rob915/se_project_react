import { useContext } from "react";
import "./ItemModal.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemModal({
  isOpen,
  onClose,
  card,
  handleDeleteCard,
  clickCloseModal,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <div
      onClick={clickCloseModal}
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

          {currentUser._id === card.owner && (
            <button
              onClick={() => handleDeleteCard(card)}
              className="modal__card_delete-button"
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
