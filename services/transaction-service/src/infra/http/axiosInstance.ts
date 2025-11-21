import axios from "axios";

const instance = axios.create({
  baseURL: process.env.API_GATEWAY_URL || "http://localhost:5000/api/v1",
  timeout: 3000,
  withCredentials: true
});

export default instance;
