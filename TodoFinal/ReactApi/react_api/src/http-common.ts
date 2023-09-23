import axios from "axios";

export default axios.create({
  //baseURL: "http://localhost:5013/api/Todo/",
  baseURL: "https://krititodo.azurewebsites.net/api/Todo/",
  headers: {
    "Content-type": "application/json"
  }
});