// infrastructure/email/templates/transaction.template.ts

export type TransactionType = "CREDITED" | "DEBITED";

interface TransactionTemplateParams {
  email: string;
  amount: number;
  currency?: string;
  transactionId: string;
  date: string;
  type: TransactionType;
  bankAccountMasked?: string; // e.g. XXXX1234
}

export class TransactionEmailTemplate {
  static build({
    email,
    amount,
    currency = "INR",
    transactionId,
    date,
    type,
    bankAccountMasked,
  }: TransactionTemplateParams) {
    
    const isCredited = type === "CREDITED";

    const title = isCredited
      ? "Amount Credited to Your Bank Account"
      : "Amount Debited from Your Bank Account";

    const color = isCredited ? "#16a34a" : "#dc2626";

    const message = isCredited
      ? "The following amount has been credited to your bank account."
      : "The following amount has been debited from your bank account.";

    return {
      to: email,
      subject: title,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>${title}</h2>

          <p>${message}</p>

          <div style="
            font-size: 30px;
            font-weight: bold;
            color: ${color};
            margin: 20px 0;
          ">
            ${isCredited ? "+" : "-"} ${currency} ${amount.toFixed(2)}
          </div>

          <div style="margin-top:20px; font-size:14px; color:#555;">
            <p><strong>Transaction ID:</strong> ${transactionId}</p>
            <p><strong>Date:</strong> ${date}</p>
            ${
              bankAccountMasked
                ? `<p><strong>Bank Account:</strong> ${bankAccountMasked}</p>`
                : ""
            }
          </div>

          <p style="margin-top:20px;">
            If you did not perform this transaction, please contact support immediately.
          </p>
        </div>
      `,
    };
  }
}
