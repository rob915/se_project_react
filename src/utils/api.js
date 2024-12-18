const baseUrl = "http://localhost:3001";

// function getToken(){
//   return localStorage.getItem('jwt');
// }

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

function postItem(item, jwt) {
  //{name: sweater, weather: cold, imageUrl: http://sldkfj}
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
  }).then(checkResponse);
}

function deleteItem(id, jwt) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
  }).then(checkResponse);
}

function likeItem(_id, jwt) {
  return fetch(`${baseUrl}/items/${_id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
  }).then(checkResponse);
}

function dislikeItem(_id, jwt) {
  return fetch(`${baseUrl}/items/${_id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
  }).then(checkResponse);
}

function register(name, email, password, avatar) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkResponse);
}

function login(email, password) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

function updateProfile(name, avatar, jwt) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(checkResponse);
}

function getUser(jwt) {
  return fetch(`${baseUrl}/users/me`, {
    headers: {
      authorization: `Bearer ${jwt}`,
    },
  }).then(checkResponse);
}

export {
  getItems,
  postItem,
  deleteItem,
  likeItem,
  dislikeItem,
  register,
  login,
  getUser,
  updateProfile,
};
