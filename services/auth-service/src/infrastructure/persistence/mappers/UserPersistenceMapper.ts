import { IMapper } from "@figur-ledger/shared";
import { AuthUser } from "../../../domain/entities/AuthUser";
import { AuthUserDocument } from "../interfaces/IAuthUserModel";

export class UserPersistenceMapper
  implements IMapper<AuthUser, AuthUserDocument>
{
  toPersistence(entity: AuthUser): Partial<AuthUserDocument> {
    return {
      email: entity.email,
      phone: entity.phone,
      password: entity.password,

      emailVerified: entity.emailVerified,
      phoneVerified: entity.phoneVerified,

      twoFactorAuth: entity.twoFactorAuth
        ? {
            enabled: entity.twoFactorAuth.enabled,
            method: entity.twoFactorAuth.method,
            totpSecret: entity.twoFactorAuth.totpSecret,
            backupCodes: entity.twoFactorAuth.backupCodes,
          }
        : undefined,

      loginAttempts: entity.loginAttempts,
      lockUntil: entity.lockUntil ? new Date(entity.lockUntil) : undefined,
      lastLogin: entity.lastLogin ? new Date(entity.lastLogin) : undefined,
      lastLoginIp: entity.lastLoginIp,
      passwordChangedAt: entity.passwordChangedAt
        ? new Date(entity.passwordChangedAt)
        : undefined,

      role: entity.role,
      status: entity.status,
    };
  }

  toDomain(raw: AuthUserDocument): AuthUser {
    return {
      id: raw._id.toString(),
      email: raw.email,
      phone: raw.phone,
      password: raw.password,

      emailVerified: raw.emailVerified,
      phoneVerified: raw.phoneVerified,

      twoFactorAuth: raw.twoFactorAuth
        ? {
            enabled: raw.twoFactorAuth.enabled,
            method: raw.twoFactorAuth.method,
            totpSecret: raw.twoFactorAuth.totpSecret,
            backupCodes: raw.twoFactorAuth.backupCodes,
          }
        : undefined,

      loginAttempts: raw.loginAttempts,
      lockUntil: raw.lockUntil?.toISOString(),
      lastLogin: raw.lastLogin?.toISOString(),
      lastLoginIp: raw.lastLoginIp,
      passwordChangedAt: raw.passwordChangedAt?.toISOString(),

      role: raw.role,
      status: raw.status,

      createdAt: raw.createdAt?.toISOString(),
      updatedAt: raw.updatedAt?.toISOString(),
    };
  }
}
