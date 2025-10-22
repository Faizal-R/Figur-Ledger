
import { CorsOptions } from "cors";
import { config } from "dotenv";

config();
export const corsOptions: CorsOptions = {
  origin: process.env.FRONTEND_DOMAIN_URL || "http://localhost:5173",
  credentials: true, 
}