import { User } from "../../../domain/entities/User";
import { UserDTO } from "../../dto/UserDTO";

export interface IUserUseCase {
  getUserProfile(userId: string): Promise<UserDTO>;
  updateUserProfile(userId: string, userData: UserDTO): Promise<UserDTO>;
  createUser(user: Partial<User>): Promise<User>;
  getUserStats(): Promise<any>;
}