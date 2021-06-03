import { API } from "../../backend";
export const getProducts = () => {
  // http://localhost:8000/api/product we are getting ths variable by importing variable api from backend.js
  return fetch(`${API}product`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
