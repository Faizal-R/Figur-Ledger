import { AxiosInstance } from "axios";
import { createApiInstance } from "../api";
import { IUserServiceClient } from "./interfaces/IUserServiceClient";

export class UserServiceClient implements IUserServiceClient {
  private apiClient: AxiosInstance | null = null;
  constructor() {
    this.apiClient = createApiInstance({
      baseURL: process.env.USER_SERVICE_URL || "http://localhost:5002/api/v1",
    });
  }

 async getUserDetails(userId:string){
    try {
      const res = await this.apiClient?.get(`/users/${userId}`);
      return res?.data;
    } catch (error) {
      throw error;
    }
  }
}
