import { create, AxiosInstance, CreateAxiosDefaults } from "axios";
export function createApiInstance({
  baseURL,
  timeout = 5000,
  withCredentials = true,
}: CreateAxiosDefaults): AxiosInstance {
  return create({
    baseURL,
    timeout,
    withCredentials,
  });
}
