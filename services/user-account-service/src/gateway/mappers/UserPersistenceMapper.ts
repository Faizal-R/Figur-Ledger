import { IMapper } from "@figur-ledger/shared";
import { IUserDocument } from "../models/interfaces/IUserModel";

import { User } from "../../domain/entities/User";
import { Types } from "mongoose";
export class UserPersistenceMapper implements IMapper<User, IUserDocument> {
  toPersistence(entity: User): Partial<IUserDocument> {
    console.log("entisssty", entity);
    
    return {
      _id: new Types.ObjectId(entity.id),
      email: entity.email,
      phone: entity.phone,
      authUserId:entity.authUserId,
      personalInfo: {
        firstName: entity.personalInfo.firstName || "",
        lastName: entity.personalInfo.lastName || "",
        dateOfBirth: entity.personalInfo.dateOfBirth,
      },
      
      address: {
        street: entity.address?.street || "",
        city: entity.address?.city || "",
        state: entity.address?.state || "",
        zipCode: entity.address?.zipCode || "",
        country: entity.address?.country || "",
      },
    };
  }

  toDomain(raw: IUserDocument): User {
    return {
      id: raw._id.toString(),
      email: raw.email,
      phone: raw.phone,
      personalInfo: {
        firstName: raw.personalInfo.firstName,
        lastName: raw.personalInfo.lastName,
        dateOfBirth: raw.personalInfo.dateOfBirth,
      },
      authUserId:raw.authUserId,
      avatarKey: null,
      address: {
        street: raw.address.street,
        city: raw.address.city,
        state: raw.address.state,
        zipCode: raw.address.zipCode,
        country: raw.address.country,
      },
      
      createdAt: raw.createdAt?.toISOString(),
      updatedAt: raw.updatedAt?.toISOString(),
    };
  }
}
