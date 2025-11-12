import { injectable } from "inversify";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import IJwtTokenService from "../../domain/interfaces/services/IJwtTokenService";
import { IJwtTokenPayload } from '../../types/IJwt';
import { uuidv4 } from "zod";
import dotenv from "dotenv";
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
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY as SignOptions["expiresIn"], 
    };

    return jwt.sign(payload, secret, options);
  }

  signRefreshToken(payload: IJwtTokenPayload): string {
    const secret = process.env.REFRESH_TOKEN_SECRET as string;

    const options: jwt.SignOptions = {
      expiresIn: process.env
        .REFRESH_TOKEN_EXPIRY as jwt.SignOptions["expiresIn"],
    };

    return jwt.sign(payload, secret, options);
  }

  verifyAccessToken<TPayload = IJwtTokenPayload>(token: string): TPayload {
    return jwt.verify(token, this.accessSecret) as TPayload;
  }

  verifyRefreshToken<TPayload = IJwtTokenPayload>(token: string): TPayload {
    return jwt.verify(token, this.refreshSecret) as TPayload;
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
