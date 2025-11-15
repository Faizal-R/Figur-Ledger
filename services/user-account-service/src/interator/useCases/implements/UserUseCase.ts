import { inject, injectable } from "inversify";
import { tryCatch } from "@figur-ledger/handlers"
import { UserDTO } from "../../dto/UserDTO";
import { IUserUseCase } from "../interfaces/IUserUseCase";
import { DI_TOKENS } from "../../../di/types";
import { IUserRepository } from "../../../domain/interfaces/repositories/IUserRepository";
import {CustomError} from "@figur-ledger/utils";
import { statusCodes } from '@figur-ledger/types'
import { UserDTOMapper } from "../../mapper/UserDTOMapper";
import { User } from "../../../domain/entities/User";
@injectable()
export class UserUseCase implements IUserUseCase {
  constructor(
    @inject(DI_TOKENS.REPOSITORIES.USER_REPOSITORY)
    private readonly _userRepository: IUserRepository
  ) {}
  async getUserProfile(userId: string): Promise<UserDTO> {
    
    try {
      console.log(userId)
      const userProfile = await this._userRepository.findById(userId);
      console.log(userProfile)
      if (!userProfile) {
        throw new CustomError(
          "No User Found with this id",
          statusCodes.NOT_FOUND
        );
      }
      return UserDTOMapper.toResponse(userProfile);
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        "An Error Occured while fetching user profile",
        statusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
  async updateUserProfile(userId: string, userData: UserDTO): Promise<UserDTO> {
    try {
       console.log(userId)
      const updatedUserProfile = await this._userRepository.update(
        userId,
        userData
      );
      console.log(updatedUserProfile)

      return UserDTOMapper.toResponse(updatedUserProfile as User);
    } catch (error) {
      console.log(error);
      throw new CustomError(
        "An Error Occured while updating user profile",
      statusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async createUser(user:User):Promise<void>{
    try {
      await this._userRepository.create(user)
    } catch (error) {
      console.log(error)
      throw new CustomError(
        "An Error Occured while creating user",
      statusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}
