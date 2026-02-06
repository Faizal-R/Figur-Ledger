export const LoanRoutes={
    LoanProductRoutes:{
        CREATE:  `/loan/products`,
        GET_ALL:  (userId?:string)=>`/loan/products/${userId}`,
    },
    LoanApplicationRoutes:{
        APPLY:  `/loan/applications/apply`,
        GET_ALL:  `/loan/applications`,
        APPROVE_OR_REJECT:  `/loan/applications/update-status`,
        GET_ALL_BY_USER_AND_STATUS: (userId:string,status:string)=> `/loan/applications/${userId}/?status=${status}`,
    },
    LoanEmiRoutes:{
        GET_ALL:(applicationId:string)=>  `/loan/emi/${applicationId}`,
    }
}