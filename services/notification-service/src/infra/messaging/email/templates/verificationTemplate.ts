// infrastructure/email/templates/verification.template.ts

export class VerificationEmailTemplate {
  static build(email: string, otp: string) {
    return {
      to: email,
      subject: "Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Your Verification Code</h2>
          <p>Use the OTP below to verify your account:</p>
          
          <div style="
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 4px;
            margin: 20px 0;
          ">
            ${otp}
          </div>

          <p>This code will expire in 10 minutes.</p>
        </div>
      `,
    };
  }
}
