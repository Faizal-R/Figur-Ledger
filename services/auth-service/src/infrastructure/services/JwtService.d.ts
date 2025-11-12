import IJwtTokenService from "../../domain/interfaces/services/IJwtTokenService";
import { IJwtTokenPayload } from '../../types/IJwt';
export default class JwtService implements IJwtTokenService {
    private readonly accessSecret;
    private readonly refreshSecret;
    private readonly accessTokenExpiry;
    private readonly refreshTokenExpiry;
    constructor();
    signAccessToken(payload: IJwtTokenPayload): string;
    signRefreshToken(payload: IJwtTokenPayload): string;
    verifyAccessToken<TPayload = IJwtTokenPayload>(token: string): TPayload;
    verifyRefreshToken<TPayload = IJwtTokenPayload>(token: string): TPayload;
    decode<TPayload = IJwtTokenPayload>(token: string): TPayload | null;
    generateTokenId(): string;
}
