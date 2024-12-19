import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

const ClothesSection = ({
  handleCardClick,
  clothingItems,
  handleAddClick,
  onCardLike,
}) => {
  const { currentUser } = useContext(CurrentUserContext);
  const filteredClothingItems = clothingItems.filter((item) => {
    return currentUser._id === item.owner;
  });

  return (
    <div className="clothes-section">
      <div className="clothes-section__context-container">
        <p className="clothes-section__title">Your items</p>
        <button onClick={handleAddClick} className="clothes-section__button">
          + Add new
        </button>
      </div>
      <div>
        <ul className="clothes-section__list">
          {filteredClothingItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                onCardLike={onCardLike}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ClothesSection;
