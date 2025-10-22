import { IUser } from "../../../domain/entities/IUser";
import { AuthUserDTO, AuthUserResponseDTO } from "../../dto/UserDTO";

export interface IAuthUseCase {
    login(loginInput:{email: string, password: string}): Promise<AuthUserResponseDTO>;
    register(registerData: IUser): Promise<AuthUserResponseDTO>;
}