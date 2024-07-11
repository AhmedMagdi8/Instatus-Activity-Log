// axiosInstance.js
import axios from "axios";

// const token = localStorage.getItem("authToken");

export const Axios = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const AxiosForm = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  timeout: 5000,
  headers: {
    "Content-Type": "multipart/form-data",
    // Authorization: `Token ${token}`,
  },
});
