const baseUrl = "http://localhost:3001";

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

function postItem(item) {
  return fetch(`${baseUrl}/items`, {
    method: "post",
    body: JSON.stringify(item),
    headers: { "content-type": "application/json" },
  }).then(checkResponse);
}

function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "delete",
  }).then(checkResponse);
}

export { getItems, postItem, deleteItem };
