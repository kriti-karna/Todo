import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5013/api/Todo/",
  headers: {
    "Content-type": "application/json"
  }
});