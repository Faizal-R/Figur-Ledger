import { ROLES } from "../domain/enums";

export interface IJwtTokenPayload {
    sub: string;     
    iat?: number;      
    exp?: number;    
    jti: string;   
    scope:ROLES
  }