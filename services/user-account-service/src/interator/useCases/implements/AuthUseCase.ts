import { inject, injectable } from "inversify";
import { IUser } from "../../../domain/entities/User";
import { AuthUserResponseDTO } from "../../dto/UserDTO";
import { IAuthUseCase } from "../interfaces/IAuthUseCase";
import IHashService from "../../../domain/interfaces/services/IHashService";
import { IUserRepository } from "../../../domain/interfaces/repositories/IUserRepository";
import { DI_TOKENS } from "../../../di/types";
import { CustomError } from "../../../errors/CustomError";
import { HTTP_STATUS_CODE } from "../../../domain/enums/HttpStatusCodes";
import IJwtTokenService from "../../../domain/interfaces/services/IJwtTokenService";
import { UserMapper } from "../../mapper/UserMapper";
import { UserRegisterInput } from "../../../interfaces/validations/auth/AuthSchema";

@injectable()
export class AuthUseCase implements IAuthUseCase {
  constructor(
    @inject(DI_TOKENS.SERVICES.HASH_SERVICE) private _hashService: IHashService,
    @inject(DI_TOKENS.REPOSITORIES.USER_REPOSITORY)
    private _userRepository: IUserRepository,
    @inject(DI_TOKENS.SERVICES.JWT_TOKEN_SERVICE)
    private _jwtTokenService: IJwtTokenService
  ) {}
  async login(loginInput: {
    email: string;
    password: string;
  }): Promise<AuthUserResponseDTO> {
    const existingUser = await this._userRepository.findOne({
      email: loginInput.email,
    });
    console.log(existingUser);

    if (
      !existingUser ||
      !(await this._hashService.compare(
        loginInput.password,
        existingUser.password
      ))
    ) {
      throw new CustomError(
        "The e-mail or password you entered is incorrect. Please try again.",
        HTTP_STATUS_CODE.UNAUTHORIZED
      );
    }

    const tokenId = this._jwtTokenService.generateTokenId();
    const accessToken = this._jwtTokenService.signAccessToken({
      sub: existingUser._id as string,
      jti: tokenId,
      scope: existingUser.role,
    });
    const refreshToken = this._jwtTokenService.signRefreshToken({
      sub: existingUser._id as string,
      jti: tokenId,
      scope: existingUser.role,
    });

    return UserMapper.toAuthUserResponseDTO(
      existingUser as IUser,
      accessToken,
      refreshToken
    );
  }
  async register(
    registerData: UserRegisterInput
  ): Promise<AuthUserResponseDTO> {
    const { email, password } = registerData;

    const existingUser = await this._userRepository.findOne({ email });
    if (existingUser) {
      throw new CustomError(
        "User with this email already exists",
        HTTP_STATUS_CODE.CONFLICT
      );
    }

    const hashedPassword = await this._hashService.hash(password);

    const newUser = await this._userRepository.create({
      ...registerData,
      password: hashedPassword,
      lastLoginAt: new Date(),
    });

    const tokenId = this._jwtTokenService.generateTokenId();
    const accessToken = this._jwtTokenService.signAccessToken({
      sub: newUser._id as string,
      jti: tokenId,
      scope: newUser.role,
    });
    const refreshToken = this._jwtTokenService.signRefreshToken({
      sub: newUser._id as string,
      jti: tokenId,
      scope: newUser.role,
    });

    return UserMapper.toAuthUserResponseDTO(
      newUser as IUser,
      accessToken,
      refreshToken
    );
  }
}
