import { config } from "dotenv";
import { CookieOptions } from "express";
config();

const REFRESH_COOKIE_EXPIRY =
  (Number(process.env.REFRESH_COOKIE_DAYS) || 7) * 24 * 60 * 60 * 1000;
export const REFRESH_TOKEN_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: true,
  maxAge: REFRESH_COOKIE_EXPIRY,
  path: "/",
};