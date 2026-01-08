export const DI_TOKENS = {
    CONTROLLERS: {
        LOAN_APPLICATION_CONTROLLER: Symbol.for("LoanApplicationController"),
        LOAN_PRODUCT_CONTROLLER: Symbol.for("LoanProductController"),
        CREDIT_PROFILE_CONTROLLER: Symbol.for("CreditProfileController"),
        REPAYMENT_SCHEDULE_CONTROLLER: Symbol.for("RepaymentScheduleController"),
    },
    SERVICES: {
        LOAN_APPLICATION_SERVICE: Symbol.for("LoanApplicationService"),
        LOAN_PRODUCT_SERVICE: Symbol.for("LoanProductService"),
        CREDIT_PROFILE_SERVICE: Symbol.for("CreditProfileService"),
        REPAYMENT_SCHEDULE_SERVICE: Symbol.for("RepaymentScheduleService"),
    },
    REPOSITORIES: {
        LOAN_APPLICATION_REPOSITORY: Symbol.for("LoanApplicationRepository"),
        LOAN_PRODUCT_REPOSITORY: Symbol.for("LoanProductRepository"),
        CREDIT_PROFILE_REPOSITORY: Symbol.for("CreditProfileRepository"),
        REPAYMENT_SCHEDULE_REPOSITORY: Symbol.for("RepaymentScheduleRepository"),
    },
    CONSUMERS:{
        CREDIT_PROFILE_CONSUMER:Symbol.for("CreditProfileConsumer")
    }
};