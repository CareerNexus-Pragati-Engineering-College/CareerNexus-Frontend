import axios from "axios";

const API_URL = import.meta.env.VITE_APP_BACKEND_HOST + ":" + import.meta.env.VITE_APP_BACKEND_PORT + "/api";
const requestApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

requestApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);




export default requestApi;