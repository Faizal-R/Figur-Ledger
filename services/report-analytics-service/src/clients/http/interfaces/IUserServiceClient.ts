export interface IUserServiceClient {
  getUserDetails(userId: string): Promise<any>;
  getGlobalUserStats(): Promise<any>;
}