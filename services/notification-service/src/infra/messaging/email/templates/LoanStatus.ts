

export type LoanStatusType = "APPROVED" | "REJECTED";

interface LoanStatusTemplateParams {
  email: string;
  customerName?: string;
  loanApplicationId: string;

  requestedAmount: number;
  approvedAmount?: number;

  currency?: string;
  tenureInMonths: number;
  annualInterestRate: number;

  emiAmount?: number;
  totalPayableAmount?: number;

  date: string;
  type: LoanStatusType;

  rejectionReason?: string; // optional for rejected mails
}

export class LoanStatusEmailTemplate {
  static build({
    email,
    customerName,
    loanApplicationId,
    requestedAmount,
    approvedAmount,
    currency = "INR",
    tenureInMonths,
    annualInterestRate,
    emiAmount,
    totalPayableAmount,
    date,
    type,
    rejectionReason,
  }: LoanStatusTemplateParams) {

    const isApproved = type === "APPROVED";

    const title = isApproved
      ? "Your Loan Application Has Been Approved"
      : "Update on Your Loan Application";

    const color = isApproved ? "#16a34a" : "#dc2626";

    const headline = isApproved
      ? "Congratulations! Your loan request has been approved."
      : "We regret to inform you that your loan application was not approved.";

    return {
      to: email,
      subject: title,
      html: `
      <div style="font-family: Arial, sans-serif; background:#f5f7fb; padding:30px;">
        
        <div style="
          max-width:600px;
          margin:0 auto;
          background:#ffffff;
          border-radius:10px;
          padding:30px;
          box-shadow:0 5px 20px rgba(0,0,0,0.05);
        ">
          
          <h2 style="margin-bottom:10px;">${title}</h2>

          <p>Hello ${customerName ?? "Customer"},</p>

          <p style="color:#333;">${headline}</p>

          ${
            isApproved
              ? `
                <div style="
                  background:#f0fdf4;
                  border-left:4px solid ${color};
                  padding:15px;
                  margin:20px 0;
                ">
                  <strong>Approved Amount:</strong>
                  <div style="
                    font-size:28px;
                    font-weight:bold;
                    color:${color};
                    margin-top:5px;
                  ">
                    ${currency} ${approvedAmount?.toFixed(2)}
                  </div>
                </div>
              `
              : `
                <div style="
                  background:#fef2f2;
                  border-left:4px solid ${color};
                  padding:15px;
                  margin:20px 0;
                ">
                  ${
                    rejectionReason
                      ? `<strong>Reason:</strong> ${rejectionReason}`
                      : "You may reapply after reviewing eligibility criteria."
                  }
                </div>
              `
          }

          <div style="margin-top:20px; font-size:14px; color:#555;">
            <p><strong>Loan Application ID:</strong> ${loanApplicationId}</p>
            <p><strong>Requested Amount:</strong> ${currency} ${requestedAmount.toFixed(2)}</p>
            <p><strong>Tenure:</strong> ${tenureInMonths} months</p>
            <p><strong>Interest Rate:</strong> ${annualInterestRate}% p.a</p>

            ${
              isApproved
                ? `
                  <p><strong>EMI:</strong> ${currency} ${emiAmount?.toFixed(2)}</p>
                  <p><strong>Total Payable:</strong> ${currency} ${totalPayableAmount?.toFixed(2)}</p>
                `
                : ""
            }

            <p><strong>Date:</strong> ${date}</p>
          </div>

          <p style="margin-top:25px;">
            If you have any questions, please contact our support team.
          </p>

          <p style="font-size:12px; color:#888; margin-top:30px;">
            This is an automated notification. Please do not reply directly to this email.
          </p>
        </div>
      </div>
      `,
    };
  }
}
