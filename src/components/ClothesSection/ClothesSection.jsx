import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

const ClothesSection = ({ handleCardClick, clothingItems, handleAddClick }) => {
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
          {clothingItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ClothesSection;
