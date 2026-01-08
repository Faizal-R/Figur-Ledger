export const LoanRoutes={
    LoanProductRoutes:{
        CREATE:  `/loan/products`,
        GET_ALL:  `/loan/products`,
    },
    LoanApplicationRoutes:{
        APPLY:  `/loan/applications/apply`,
        GET_ALL:  `/loan/applications`,
        APPROVE_OR_REJECT:  `/loan/applications/update-status`,
    }
}