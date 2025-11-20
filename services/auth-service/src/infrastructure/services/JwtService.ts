import { injectable } from "inversify";
import jwt, { JwtPayload, SignOptions,JsonWebTokenError,TokenExpiredError } from "jsonwebtoken";
import IJwtTokenService from "../../domain/interfaces/services/IJwtTokenService";
import { IJwtTokenPayload } from "../../types/IJwt";
import { uuidv4 } from "zod";
import dotenv from "dotenv";
import { CustomError } from "@figur-ledger/utils";
import {TokenErrorCode} from '@figur-ledger/shared'
dotenv.config();
@injectable()
export default class JwtService implements IJwtTokenService {
  private readonly accessSecret: string;
  private readonly refreshSecret: string;
  private readonly accessTokenExpiry: string;
  private readonly refreshTokenExpiry: string;
  constructor() {
    this.accessSecret = process.env.ACCESS_TOKEN_SECRET as string;
    this.refreshSecret = process.env.REFRESH_TOKEN_SECRET as string;
    this.accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY as string;
    this.refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY as string;
  }

  signAccessToken(payload: IJwtTokenPayload): string {
    const secret = process.env.ACCESS_TOKEN_SECRET as string;
    const options: SignOptions = {
      expiresIn: this.accessTokenExpiry as SignOptions["expiresIn"],
    };

    return jwt.sign(payload, secret, options);
  }

  signRefreshToken(payload: IJwtTokenPayload): string {
    const secret = process.env.REFRESH_TOKEN_SECRET as string;

    const options: jwt.SignOptions = {
      expiresIn: this.refreshTokenExpiry as jwt.SignOptions["expiresIn"],
    };

    return jwt.sign(payload, secret, options);
  }

  verifyAccessToken<TPayload = IJwtTokenPayload>(token: string): TPayload {
    return jwt.verify(token, this.accessSecret) as TPayload;
  }

verifyRefreshToken<TPayload = IJwtTokenPayload>(token: string): TPayload {
  try {
    return jwt.verify(token, this.refreshSecret) as TPayload;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new CustomError(
        "Your session has expired. Please log in again.",
        401,
        TokenErrorCode.REFRESH_TOKEN_EXPIRED
      );
    }

    if (error instanceof JsonWebTokenError) {
      throw new CustomError(
        "Invalid session token. Please log in again.",
        401,
        TokenErrorCode.REFRESH_TOKEN_INVALID
      );
    }

    throw new CustomError(
      "Unable to verify your session. Please try again.",
      400,
      TokenErrorCode.REFRESH_TOKEN_ERROR
    );
  }
}

  decode<TPayload = IJwtTokenPayload>(token: string): TPayload | null {
    const decoded = jwt.decode(token) as JwtPayload | string | null;
    if (!decoded || typeof decoded === "string") return null;
    return decoded as TPayload;
  }
  generateTokenId(): string {
    return uuidv4().toString();
  }
}
