export interface IAccountServiceClient {
  createAccount(userId:string,accountType:string,nickname:string):Promise<any>;
}