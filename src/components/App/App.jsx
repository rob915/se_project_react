import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import { getItems, postItem, deleteItem } from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: "", C: "" },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const clickCloseModal = (e) => {
    if (
      e.target.classList.contains("modal_opened") ||
      e.target.classList.contains("modal__close")
    ) {
      closeActiveModal();
    }
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const onAddItem = (item) => {
    postItem(item).then((newItem) => {
      setClothingItems([newItem, ...clothingItems]);
    });
  };

  const onDeleteCard = ({ _id }) => {
    deleteItem(_id).then(() => {
      setClothingItems(
        clothingItems.filter((item) => {
          return item._id !== _id;
        })
      );
      closeActiveModal();
    });
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                />
              }
            />
          </Routes>

          <Footer />
        </div>

        <AddItemModal
          closeActiveModal={closeActiveModal}
          clickCloseModal={clickCloseModal}
          isOpen={activeModal === "add-garment"}
          onAddItem={onAddItem}
        />

        <ItemModal
          isOpen={activeModal === "preview"}
          card={selectedCard}
          onClose={closeActiveModal}
          clickCloseModal={clickCloseModal}
          handleDeleteCard={onDeleteCard}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
