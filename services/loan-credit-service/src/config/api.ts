import axios from "axios";

const instance = axios.create({
  baseURL: process.env.TRANSACTION_SERVICE_URL,
  timeout: 3000,
  withCredentials: true
});

export default instance;
