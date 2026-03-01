export interface IUserServiceClient {
  getUserDetails(userId:string):Promise<{userName:string,userEmail:string}>

}