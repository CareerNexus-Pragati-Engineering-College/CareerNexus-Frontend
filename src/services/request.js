import axios from "axios";

const API_URL = import.meta.env.VITE_APP_BACKEND_HOST + ":" + import.meta.env.VITE_APP_BACKEND_PORT+"/api"; 
const token= localStorage.getItem("token");
const headers = {
  "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
};

const requestApi = axios.create({
  baseURL: API_URL, 
  headers: headers, 
});




export default requestApi;