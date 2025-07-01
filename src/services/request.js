import axios from "axios";

const API_URL = "http://localhost:8080/api"; // Base URL for the API
// Ensure this matches your backend API URL   
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