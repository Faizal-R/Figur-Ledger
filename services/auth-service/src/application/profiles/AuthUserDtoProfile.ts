import { AuthUser } from "../../domain/entities/AuthUser";
import { AuthUserResponseDTO } from "../dto/response/AuthUserDTO";

export default class AuthUserDtoProfile{
    static toDto(user: AuthUser):AuthUserResponseDTO {
        return {
            id: user.id,
            email: user.email,
            phone: user.phone,
            emailVerified: user.emailVerified,
            phoneVerified: user.phoneVerified,
            twoFactorAuthEnabled: user.twoFactorAuth?.enabled || false,
            role: user.role,
            status: user.status,
            lastLogin: user.lastLogin ,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }

}