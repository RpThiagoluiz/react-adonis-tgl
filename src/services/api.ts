import axios from "axios";

export const api = axios.create({
  //baseURL: "http://localhost:3333",
  baseURL: "http://127.0.0.1:3333/",
});
