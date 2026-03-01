import { AxiosInstance } from "axios";
import { createApiInstance } from "../config/api";
import { IUserServiceClient } from "../../domain/interfaces/http/IUserServiceClient";
import { injectable } from "inversify";
@injectable()
export class UserServiceClient implements IUserServiceClient {
  private apiClient: AxiosInstance | null = null;
  constructor() {
    this.apiClient = createApiInstance({
      baseURL: process.env.USER_SERVICE_URL || "http://localhost:5002/api/v1",
    });
  }

  async getUserDetails(
    userId: string,
  ): Promise<{ userName: string; userEmail: string }> {
    try {
      const res = await this.apiClient?.get(`/users/${userId}`);
      const data = res?.data.data;

      console.log(data)
      return {
        userEmail: data.email,
        userName: data.personalInfo.firstName,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
