import { useAuthUserStore } from "@/store/authUserStore";


// src/api/client.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

interface ApiResponse<T> {
    data: T;
    status: number;
    statusText: string;
}

const baseURL = process.env.NEXT_PUBLIC_API_GATEWAY_URL || 'http://localhost:5000/api/v1'

const apiClient: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth or common headers

apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthUserStore.getState().token;  // <-- Correct

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


apiClient.interceptors.response.use(
  res => res,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const refreshRes = await apiClient.post("/auth/refresh");

        const newToken = refreshRes.data.accessToken;
        useAuthUserStore.getState().setToken(newToken);

        error.config.headers.Authorization = `Bearer ${newToken}`;
        return apiClient.request(error.config);
      } catch {
        useAuthUserStore.getState().setToken(null);
      }
    }

    return Promise.reject(error);
  }
);


// Generic request wrapper
async function request<T>(
  method: 'get' | 'post' | 'put' | 'delete' | 'patch',
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await apiClient.request<ApiResponse<T>>({
    method,
    url,
    data,
    ...config,
  });
  console.log("Response received:", response);
  return response.data as T; // Return only the data
}

export default request;