import { IUser } from "../../../domain/entities/User";
import { UserRegisterInput } from "../../../interfaces/validations/auth/AuthSchema";
import { AuthUserDTO, AuthUserResponseDTO } from "../../dto/UserDTO";

export interface IAuthUseCase {
    login(loginInput:{email: string, password: string}): Promise<AuthUserResponseDTO>;
    register(registerData: UserRegisterInput): Promise<AuthUserResponseDTO>;
}