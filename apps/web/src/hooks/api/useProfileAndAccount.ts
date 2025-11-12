import { AccountService, UserService } from "@/services/api/ProfileAndAccountService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useApi } from "./useApi";
import { IAccount, IUser } from "@/types/user-account";

export const useUserProfile = (userId: string) => {
    
    const userProfileQuery = useQuery({
        queryKey: ['userProfile', userId],
        queryFn: () => UserService.getById(userId), // use the argument
        enabled: !!userId, // only fetch if userId exists
    });
   const updateUserProfile = useMutation({
    mutationFn:({ userId, updatedData }: { userId: string; updatedData: IUser }) => UserService.update(userId, updatedData),
   })
 
    return { userProfileQuery ,updateUserProfile};
};


export const useUserAccounts = (userId: string) => {
    const userAccountsQuery = useQuery({
        queryFn: () => AccountService.getAccountsByUserId(userId),
        queryKey: ['userAccounts', userId],
        enabled: !!userId,
    })
    const updateUserAccount=useMutation({
        mutationFn:(updatedData:IAccount)=>AccountService.update(userId,updatedData)
    })
    
    return({
        userAccountsQuery,
        updateUserAccount
    })
}


