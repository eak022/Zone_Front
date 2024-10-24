import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL; // Make sure this is correct
import Tokenservice from "../services/token.services";

const instance = axios.create({
  baseURL: baseURL, // Corrected here
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const token = Tokenservice.getLocalAccessToken(); // ใช้ TokenService ของคุณ
  if (token) {
    config.headers['x-access-token'] = token; // เพิ่ม token ใน header
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;