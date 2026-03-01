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
    TRANSFER_USE_CASE:Symbol.for("TransferUseCase")
    },
   
    HTTP:{
    ACCOUNT_SERVICE_CLIENT: Symbol.for("AccountServiceClient"),
    },
    CLIENT:{
    PRISMA_CLIENT: Symbol.for("PrismaClient"),
    }

};