import axios from "axios";

const instance = axios.create({
  baseURL: "https://dtodo2.herokuapp.com/api/todos",
//   baseURL: "http://localhost:8000",
});

export default instance;
