import { IAccountStatementResponseDTO } from "../dto/AccountStatementResponseDTO";

export const AccountStatementMapper = {
  toResponse(
    user: any,
    account: any,
    transactions: any[],
    startDate: string,
    endDate: string,
    totalPages: number,
    currentPage: number,
  ): IAccountStatementResponseDTO {
    return {
      user: {
        name: user.personalInfo.firstName + " " + user.personalInfo.lastName,
        email: user.email,
        phone: user.phone,
        address: Object.values(user.address).join(", ") as string,
        dateOfBirth: user.personalInfo.dateOfBirth,
      },
      account: {
        accountNumber: account.accountNumber,
        type: account.type,
        ifsc: account.ifsc,
        balance: account.balance,
        currency: account.currency,
        nickname: account.nickname,
      },
      summary: {
        beginningBalance:
          account.id == transactions[0].senderAccountId
            ? transactions[0].senderBalanceAfter + transactions[0].amount
            : transactions[0].receiverBalanceAfter - transactions[0].amount,
        closingBalance:
          account.id == transactions[transactions.length - 1].senderAccountId
            ? Number(transactions[transactions.length - 1].senderBalanceAfter)
            : Number(
                transactions[transactions.length - 1].receiverBalanceAfter,
              ),
        totalDebits: transactions
          .filter((transaction) => transaction.senderAccountId === account.id)
          .reduce((total, transaction) => total + transaction.amount, 0),
        totalCredits: transactions
          .filter((transaction) => transaction.receiverAccountId === account.id)
          .reduce((total, transaction) => total + transaction.amount, 0),
        statementPeriod: `${new Date(startDate).toDateString()} - ${new Date(endDate).toDateString()}`,
        totalPages,
        currentPage,
      },

      transactions: transactions.map((transaction) => {
        return {
          id: transaction.id,
          date: transaction.updatedAt,
          description: transaction.description || "NA",
          amount: transaction.amount,
          type: transaction.type,
          entryType:
            account.id === transaction.senderAccountId ? "DEBIT" : "CREDIT",
          balance:
            account.id === transaction.senderAccountId
              ? transaction.senderBalanceAfter
              : transaction.receiverBalanceAfter,
        };
      }),
    };
  },
};
