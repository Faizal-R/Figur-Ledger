export const DI_TOKENS = {
  REPOSITORIES: {
    TRANSACTION_REPOSITORY: Symbol.for("TransactionRepository"),
    },
    MAPPERS: {
    TRANSACTION_PERSISTENCE_MAPPER: Symbol.for("TransactionPersistenceMapper"),
    },
    CONTROLLER:{
    TRANSACTION_CONTROLLER: Symbol.for("TransactionController"),
    },
    USE_CASES:{
    TRANSACTION_USE_CASES: Symbol.for("TransactionUseCases"),
    },
    EXTERNAL:{
    RAZORPAY_CLIENT: Symbol.for("RazorpayClient"),
    },
    HTTP:{
    ACCOUNT_SERVICE_CLIENT: Symbol.for("AccountServiceClient"),
    }

};