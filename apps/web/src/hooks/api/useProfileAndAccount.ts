import { useQuery, useMutation } from "@tanstack/react-query";
import { UserService,AccountService  } from "@/services/api/ProfileAndAccountService";
import { IUser, IAccount } from "@/types/user-account";

/* ----------------------------------------------------
   USER PROFILE QUERIES & MUTATIONS
---------------------------------------------------- */

export const useUserProfile = (userId: string) => {
  return useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => UserService.getById(userId),
    enabled: !!userId,
  });
};

export const useUpdateUserProfile = (userId: string) => {
  return useMutation({
    mutationFn: (updatedData: IUser) =>
      UserService.update(userId, updatedData),
  });
};

/* ----------------------------------------------------
   USER ACCOUNTS QUERIES & MUTATIONS
---------------------------------------------------- */

// export const useUserAccounts = (userId: string) => {
//   return useQuery({
//     queryKey: ["userAccounts", userId],
//     queryFn: () => AccountService.getAccountsByUserId(userId),
//     enabled: !!userId,
//   });
// };

export const useCreateBankAccount = () => {
  return useMutation({
    mutationFn: (account: {
      currency: string;
      type: string;
      nickname: string;
      userId:string
    }) => AccountService.createBankAccount(account),
  });
};
