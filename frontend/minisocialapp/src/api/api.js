import axios from "axios";

const API = axios.create({
  baseURL: "https://mini-social-app-1ywb.onrender.com"

});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = localStorage.getItem("token");
  }
  return req;
});

export default API;
