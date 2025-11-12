import { Schema, model } from 'mongoose';
import { AuthUserDocument } from '../interfaces/IAuthUserModel';
  import { Roles } from '@figur-ledger/types';
const AuthUserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true
    },
    password: {
      type: String,
      required: true,
    },
    emailVerified: {
      type: Boolean,
      default: false
    },
    phoneVerified: {
      type: Boolean,
      default: false
    },
    twoFactorAuth: {
      enabled: {
        type: Boolean,
        default: false
      },
      method: {
        type: String,
        enum: ['sms', 'totp']
      },
      totpSecret: {
        type: String,
        select: false
      },
      backupCodes: [{
        type: String,
        select: false
      }]
    },
    loginAttempts: {
      type: Number,
      default: 0
    },
    lockUntil: {
      type: Date
    },
    lastLogin: {
      type: Date
    },
    lastLoginIp: {
      type: String
    },
    passwordChangedAt: {
      type: Date
    },
    role: {
      type: String,
      required: true,
      enum: Object.values(Roles),
      default: Roles.CUSTOMER
    },
    status: {
      type: String,
      enum: ['active', 'locked', 'suspended', 'closed'],
      default: 'active'
    }
  },
  {
    timestamps: true
  }
);


// AuthUserSchema.index({ email: 1 });
// AuthUserSchema.index({ phone: 1 });
// AuthUserSchema.index({ status: 1 });
// AuthUserSchema.index({ role: 1 });
// AuthUserSchema.index({ createdAt: 1 });
// AuthUserSchema.index({ emailVerified: 1, phoneVerified: 1 });

 const AuthUserModel = model<AuthUserDocument>('AuthUser', AuthUserSchema);
  export default AuthUserModel;