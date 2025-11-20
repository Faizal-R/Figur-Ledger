import { httpMethods } from "@/constant/api/enums/api";
import { AuthRoutes } from "@/constant/api/routes/authRoutes";
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
  withCredentials:true
});



apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthUserStore.getState().token; 
    console.log("Token:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      originalRequest._retry = true;

      try {
        // 3. Call refresh token API
        const refreshRes = await request<ApiResponse<{accessToken:string}>>(httpMethods.POST,AuthRoutes.REFRESH_TOKEN);

        const newToken = refreshRes.data.accessToken;
        useAuthUserStore.getState().setToken(newToken);

        
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);

      } catch (err) {
        
        useAuthUserStore.getState().setToken(null);
        return Promise.reject(err);
      }
    }

    // 6. For non-401 errors
    return Promise.reject(error);
  }
);



// Generic request wrapper
async function request<T>(
  method: httpMethods,
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
  return response.data as T; 
}

export default request;