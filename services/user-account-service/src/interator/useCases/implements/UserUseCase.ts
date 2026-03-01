import { inject, injectable } from "inversify";
import { UserDTO } from "../../dto/UserDTO";
import { IUserUseCase } from "../interfaces/IUserUseCase";
import { DI_TOKENS } from "../../../di/types";
import { IUserRepository } from "../../../domain/interfaces/repositories/IUserRepository";
import { CustomError } from "@figur-ledger/utils";
import { statusCodes } from "@figur-ledger/shared";
import { UserDTOMapper } from "../../mapper/UserDTOMapper";
import { User } from "../../../domain/entities/User";
import { UserMessages } from "../../../interfaces/controllers/implements/UserMessages";
@injectable()
export class UserUseCase implements IUserUseCase {
  constructor(
    @inject(DI_TOKENS.REPOSITORIES.USER_REPOSITORY)
    private readonly _userRepository: IUserRepository,
  ) {}
  async getUserProfile(userId: string): Promise<UserDTO> {
    try {
      console.log(userId);
      const userProfile = await this._userRepository.findOne({
        authUserId: userId,
      });
      console.log(userProfile);
      if (!userProfile) {
        throw new CustomError(
          UserMessages.USER_NOT_FOUND,
          statusCodes.NOT_FOUND,
        );
      }
      return UserDTOMapper.toResponse(userProfile);
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        UserMessages.FETCH_PROFILE_FAILED,
        statusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async updateUserProfile(userId: string, userData: UserDTO): Promise<UserDTO> {
    try {
      const userProfile = await this._userRepository.findOne({
        authUserId: userId,
      });

      const updatedUserProfile = await this._userRepository.update(
        userProfile?.id as string,
        userData,
      );
      console.log(updatedUserProfile);

      return UserDTOMapper.toResponse(updatedUserProfile as User);
    } catch (error) {
      console.log(error);
      throw new CustomError(
        UserMessages.UPDATE_PROFILE_FAILED,
        statusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createUser(user: User): Promise<User> {
    try {
      const createdUser = await this._userRepository.create(user);
      return createdUser;
    } catch (error) {
      console.log(error);
      throw new CustomError(
        UserMessages.CREATE_USER_FAILED,
        statusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
