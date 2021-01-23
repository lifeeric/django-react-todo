import axios from "axios";

const instance = axios.create({
  baseURL: "https://dtodo2.herokuapp.com/",
//   baseURL: "http://localhost:8000",
});

export default instance;
