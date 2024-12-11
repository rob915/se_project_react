const baseUrl = "http://localhost:3001";

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

function postItem(item, jwt) {
  return fetch(`${baseUrl}/items`, {
    method: "post",
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
  }).then(checkResponse);
}

function deleteItem(id, jwt) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "delete",
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

function getUser(jwt) {
  return fetch(`${baseUrl}/users/me`, {
    headers: {
      authorization: `Bearer ${jwt}`,
    },
  }).then(checkResponse);
}

export { getItems, postItem, deleteItem, register, login, getUser };
