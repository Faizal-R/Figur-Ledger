// src/api/apiService.ts
import request from "@/config/client";
import { ApiResponse } from "@/types/api";

export interface BaseApiService<T> {
  getAll: () => Promise<ApiResponse<T[]>>;
  getById: (id: string | number) => Promise<ApiResponse<T>>;
  create: (data: Partial<T>) => Promise<ApiResponse<T>>;
  update: (id: string, data: Partial<T>) =>  Promise<ApiResponse<T>>;
  delete: (id: string | number) => Promise<void>;
}

export type ApiService<T, CustomMethods = {}> = BaseApiService<T> &
  CustomMethods;

export function createApiService<T, CustomMethods = {}>(
  endpoint: string,
  customMethods?: CustomMethods
): ApiService<T, CustomMethods> {
  const baseService: BaseApiService<T> = {
    getById: (id) => request<ApiResponse<T>>("get", `/${endpoint}/${id}`),
    getAll: () => {
      console.log(`Fetching all from ${endpoint}`);
      return request<ApiResponse<T[]>>("get", `/${endpoint}`);
    },
    create: (data) => request<ApiResponse<T>>("post", `/${endpoint}`, data),
    update: (id, data) => request<ApiResponse<T>>("put", `/${endpoint}/${id}`, data),
    delete: (id) => request<void>("delete", `/${endpoint}/${id}`),
  };

  return {
    ...baseService,
    ...customMethods,
  } as ApiService<T, CustomMethods>;
}
