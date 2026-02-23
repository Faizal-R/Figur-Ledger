import { create, AxiosInstance, CreateAxiosDefaults } from "axios";
export function createApiInstance({
  baseURL,
  timeout = 3000,
  withCredentials = true,
}: CreateAxiosDefaults): AxiosInstance {
  return create({
    baseURL,
    timeout,
    withCredentials,
  });
}
