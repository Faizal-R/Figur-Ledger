import { CorsOptions } from "cors";
import { config } from "dotenv";

config();

export const corsOptions: CorsOptions = {
  origin: process.env.FRONTEND_DOMAIN_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
};
 