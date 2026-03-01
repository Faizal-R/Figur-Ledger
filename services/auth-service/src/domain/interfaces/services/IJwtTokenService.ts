import { IJwtTokenPayload } from "../../../types/IJwt";

export default interface IJwtTokenService {
  signAccessToken(payload: IJwtTokenPayload, expiresIn?: string): string;
  signRefreshToken(payload: IJwtTokenPayload, expiresIn?: string): string;
  verifyAccessToken<TPayload = IJwtTokenPayload>(token: string): TPayload;
  verifyRefreshToken<TPayload = IJwtTokenPayload>(token: string): TPayload;
  decode<TPayload = IJwtTokenPayload>(token: string): TPayload | null;
  generateTokenId(): string;
} 