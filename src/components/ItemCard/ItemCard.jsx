import { useContext, useEffect, useState } from "react";
import "./ItemCard.css";
import { likeItem, dislikeItem } from "../../utils/api";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, clothingItems, onCardLike }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const isLiked = item.likes.some((like) => like === currentUser._id);

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__title">{item.name}</h2>
        {isLoggedIn && currentUser._id === item.owner && (
          <button
            onClick={() => {
              onCardLike(isLiked, item);
            }}
            className={`card__like-button ${
              isLiked && "card__like-button_active"
            }`}
          ></button>
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
