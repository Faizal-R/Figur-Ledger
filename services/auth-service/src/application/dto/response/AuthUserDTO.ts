import { DateString } from "@figur-ledger/types";

export interface AuthUserResponseDTO {
    id: string;
    email: string;
    phone: string;
    emailVerified: boolean;
    phoneVerified?: boolean;
    twoFactorAuthEnabled?: boolean;
    role: string;
    status: string;
}