import axios from "axios";

const instance = axios.create({
  baseURL: process.env.ACCOUNT_SERVICE_URL || "http://localhost:5002/api/v1",
  timeout: 3000,
  withCredentials: true
});

export default instance;
