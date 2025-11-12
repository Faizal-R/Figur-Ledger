import { inject, injectable } from "inversify";
import { tryCatch } from "../../../../../../packages/handlers/src/tryCatch/tryCatch";
import { UserDTO } from "../../dto/UserDTO";
import { IUserUseCase } from "../interfaces/IUserUseCase";
import { DI_TOKENS } from "../../../di/types";
import { IUserRepository } from "../../../domain/interfaces/repositories/IUserRepository";
import { CustomError } from "../../../errors/CustomError";
import { HTTP_STATUS_CODE } from "../../../domain/enums/HttpStatusCodes";
import { UserMapper } from "../../mapper/UserMapper";
import { IUser } from "../../../domain/entities/User";
@injectable()
export class UserUseCase implements IUserUseCase {
  constructor(
    @inject(DI_TOKENS.REPOSITORIES.USER_REPOSITORY)
    private readonly _userRepository: IUserRepository
  ) {}
  async getUserProfile(userId: string): Promise<UserDTO> {
    try {
      const userProfile = await this._userRepository.findById(userId);
      if (!userProfile) {
        throw new CustomError(
          "No User Found with this id",
          HTTP_STATUS_CODE.NOT_FOUND
        );
      }
      return UserMapper.toEnity(userProfile);
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        "An Error Occured while fetching user profile",
        HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
      );
    }
  }
  async updateUserProfile(userId: string, userData: UserDTO): Promise<UserDTO> {
    try {
      const updatedUserProfile = await this._userRepository.update(
        userId,
        userData
      );

      return UserMapper.toEnity(updatedUserProfile as IUser);
    } catch (error) {
      console.log(error);
      throw new CustomError(
        "An Error Occured while updating user profile",
        HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
      );
    }
  }
}
