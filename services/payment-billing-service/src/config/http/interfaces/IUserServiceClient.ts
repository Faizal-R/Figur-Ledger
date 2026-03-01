export interface IUserServiceClient {
  createUser(userData: {
    email:string,
    phone:number,
    authUserId:string,
    personalInfo:{
        firstName:string,
    }
    }):Promise<any>;

}