import { IAccount, IUser } from "@/types/user-account";
import { createApiService } from "./ApiService";
import request from "@/config/client";
import { ApiResponse } from "@/types/api";


interface AcccountServiceCustomMethods{
getAccountsByUserId:(userId:string)=>Promise<ApiResponse<IAccount[]>>
}

export const UserService = createApiService<IUser>("users")
export const AccountService=createApiService<IAccount,AcccountServiceCustomMethods>("users/accounts",{
    getAccountsByUserId:(userId:string)=>request<ApiResponse<IAccount[]>>("get",`users/accounts?userId=${userId}`)

})