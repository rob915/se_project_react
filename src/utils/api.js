const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

function postItem(item) {
  return fetch(`${baseUrl}/items`, {
    method: "post",
    body: JSON.stringify(item),
    headers: { "content-type": "application/json" },
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "delete",
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

export { getItems, postItem, deleteItem };
