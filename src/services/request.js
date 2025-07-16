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


const requestApiWithFileUpload = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  },
   onUploadProgress: (progressEvent => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    console.log(`Upload progress: ${percentCompleted}%`);
                    // Update your UI with progress here
                })
});

export default requestApi;