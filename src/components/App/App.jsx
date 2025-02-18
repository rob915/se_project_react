import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import {
  getItems,
  postItem,
  deleteItem,
  register,
  login,
  getUser,
  updateProfile,
  likeItem,
  dislikeItem,
} from "../../utils/api";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    name: "",
    avatar: "",
    email: "",
  });

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

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const onAddItem = (item) => {
    postItem(item, localStorage.getItem("jwt"))
      .then((newItem) => {
        setClothingItems([newItem.data, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onDeleteCard = ({ _id }) => {
    deleteItem(_id, localStorage.getItem("jwt"))
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => {
            return item._id !== _id;
          })
        );
        closeActiveModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCardLike = (isLiked, item) => {
    if (!isLiked) {
      likeItem(item._id, localStorage.getItem("jwt")).then((card) => {
        const newClothingItemsArray = clothingItems.map((clothingItem) =>
          clothingItem._id === item._id ? card : clothingItem
        );
        setClothingItems(newClothingItemsArray);
      });
    } else {
      dislikeItem(item._id, localStorage.getItem("jwt")).then((card) => {
        const newClothingItemsArray = clothingItems.map((clothingItem) =>
          clothingItem._id === item._id ? card : clothingItem
        );
        setClothingItems(newClothingItemsArray);
      });
    }

    //if that's successful, then you want to visually like the item
  };

  const handleRegisterModalSubmit = (name, email, password, avatar) => {
    //fetch to create a new user
    return (
      register(name, email, password, avatar)
        // call handloginModalSubmit
        .then((user) => handleLoginModalSubmit(email, password))
    );
  };

  const handleLoginModalSubmit = (email, password) => {
    //log the user in
    return login(email, password).then((data) => {
      //store the token in localStorage
      localStorage.setItem("jwt", data.token);
      //set the current user state
      setCurrentUser(data.user);
      //set the isLoggedIn state to true
      setIsLoggedIn(true);
      closeActiveModal();
    });
  };

  const handleEditProfileModalSubmit = (name, avatar) => {
    return updateProfile(name, avatar, localStorage.getItem("jwt")).then(
      (user) => {
        setCurrentUser(user);
        closeActiveModal();
      }
    );
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

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getUser(token)
        .then((res) => {
          setCurrentUser(res);
          setIsLoggedIn(true);
        })
        .catch(console.error);
    }
  }, []);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <CurrentUserContext.Provider
          value={{ isLoggedIn, setIsLoggedIn, currentUser }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              onSignUpClick={handleRegisterClick}
              onLoginClick={handleLoginClick}
              weatherData={weatherData}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      weatherData={weatherData}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      onEditProfileClick={handleEditProfileClick}
                      onLogoutClick={handleLogoutClick}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="*"
                element={
                  isLoggedIn ? (
                    <Navigate to="/profile" replace />
                  ) : (
                    <Navigate to="/" replace />
                  )
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

          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            clickCloseModal={clickCloseModal}
            onRegisterModalSubmit={handleRegisterModalSubmit}
            onLoginClick={handleLoginClick}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            clickCloseModal={clickCloseModal}
            onLoginModalSubmit={handleLoginModalSubmit}
            onRegisterClick={handleRegisterClick}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            clickCloseModal={clickCloseModal}
            onEditProfileModalSubmit={handleEditProfileModalSubmit}
          />
        </CurrentUserContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}
// props = {isOpen: true, onClose: closeActiveModal, ...}

export default App;
