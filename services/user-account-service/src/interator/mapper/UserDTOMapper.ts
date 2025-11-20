import { User } from "../../domain/entities/User";
import { DateString } from "../../types";
import { UserDTO } from "../dto/UserDTO";

export class UserDTOMapper {
  static toResponse(user: User): UserDTO {
    const { personalInfo, address } = user;

    return {
      id: user.id,

     personalInfo:{ firstName: personalInfo.firstName,
      lastName: personalInfo.lastName,
      dateOfBirth: personalInfo.dateOfBirth,},
    address:{ street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,},
      email: user.email,
      phone: user.phone,

      createdAt: user.createdAt as DateString,
      updatedAt: user.updatedAt as DateString
    };
  }
}
