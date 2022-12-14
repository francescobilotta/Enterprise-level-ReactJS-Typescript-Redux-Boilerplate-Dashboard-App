import axios from "axios";
/* create an instance of axios with a default base URI when sending HTTP requests */
/* JSON Server has CORS Policy by default */
const api = axios.create({
  baseURL:
    "https://my-json-server.typicode.com/francescobilotta/Enterprise-level-ReactJS-Typescript-Redux-Boilerplate-Dashboard-App",
});
export default api;
export const EndPoints = {
  events: "events",
  login: "login",
  products: "products",
  register: "register",
  sales: "sales",
  users: "users",
  usersDb: "users-db",
};
