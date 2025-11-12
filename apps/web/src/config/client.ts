

// src/api/client.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

interface ApiResponse<T> {
    data: T;
    status: number;
    statusText: string;
}

const baseURL = process.env.NEXT_PUBLIC_API_GATEWAY_URL || 'http://localhost:5005'

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
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    console.log("Request made with headers:", config.headers,config);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for consistent error handling
// apiClient.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Handle unauthorized (e.g., redirect to login)
//       console.error('Unauthorized, redirecting to login...');
//     }
//     return Promise.reject(error.response?.data?.message || 'An error occurred');
//   }
// );

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
  return response.data as T; // Return only the data
}

export default request;