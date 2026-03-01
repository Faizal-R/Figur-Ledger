import nodemailer from "nodemailer";
import { INotificationProvider } from "../../domain/interfaces/services/INotificationProvider";
import { config } from "dotenv";
config()
export class NotificationProvider implements INotificationProvider {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      }
    });
  }

  async sendEmail(params: { to: string; subject: string; html?: string; text?: string; }): Promise<void> {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      ...params
    });
  }
}
