import { Roles } from "@figur-ledger/shared";

export interface IJwtTokenPayload {
    sub: string;     
    iat?: number;      
    exp?: number;    
    jti: string;   
    scope:Roles
  }