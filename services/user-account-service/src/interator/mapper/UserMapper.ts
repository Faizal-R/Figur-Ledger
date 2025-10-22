import { IUser } from "../../domain/entities/IUser";
import { DateString } from "../../types";
import { AuthUserDTO, AuthUserResponseDTO, UserDTO } from "../dto/UserDTO";

export const UserMapper = {
  toAuthUserDTO(user:IUser): AuthUserDTO {
    return {
      id: user._id as string,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    };
  },
  toAuthUserResponseDTO(user:IUser, accessToken:string, refreshToken:string): AuthUserResponseDTO {
    return {
      user: this.toAuthUserDTO(user),
      accessToken,
      refreshToken,
    };
  },
  toEnity(user:IUser):UserDTO{
    return { 
      id:user._id as string,
      fullName:user.fullName,
      email:user.email,
      role:user.role,
      isActive:user.isActive,
      createdAt:user.createdAt as DateString
    }
  }
};


