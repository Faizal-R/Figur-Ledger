import { Roles } from "@figur-ledger/types";
export interface IJwtTokenPayload {
    sub: string;
    iat?: number;
    exp?: number;
    jti: string;
    scope: Roles;
}
