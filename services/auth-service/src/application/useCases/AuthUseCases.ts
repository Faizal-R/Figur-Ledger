import IAuthUseCases from "./interfaces/IAuthUseCases";
import { injectable, inject } from "inversify";
import { DI_TOKENS } from "../../di/types";
import { IAuthUserRepository } from "../../domain/interfaces/reposiotries/IAuthUserRepository";
import { AuthUserResponseDTO } from "../dto/response/AuthUserDTO";
import { CustomError } from "@figur-ledger/utils";
import { Roles, statusCodes } from "@figur-ledger/types";
import IHashService from "../../domain/interfaces/services/IHashService";
import IJwtTokenService from "../../domain/interfaces/services/IJwtTokenService";
import { IJwtTokenPayload } from "../../types/IJwt";
import AuthUserDtoProfile from "../profiles/AuthUserDtoProfile";
import { redis } from "@figur-ledger/shared";
import { RegisterRequestDTO } from "../dto/request/RegisterRequestDTO";
import RegisterSchema, {
  RegisterWithConfirmSchema,
} from "../../presentation/validations/AuthUserSchema";
@injectable()
export default class AuthUseCases implements IAuthUseCases {
  constructor(
    @inject(DI_TOKENS.REPOSITORIES.AUTH_USER_REPOSITORY)
    private _authUserRepository: IAuthUserRepository,
    @inject(DI_TOKENS.SERVICES.HASH_SERVICE) private _hashService: IHashService,
    @inject(DI_TOKENS.SERVICES.JWT_TOKEN_SERVICE)
    private _tokenService: IJwtTokenService
  ) {}

  async login(
    email: string,
    password: string
  ): Promise<{
    user: AuthUserResponseDTO;
    accessToken: string;
    refreshToken: string;
  }> {
    try {
      const user = await this._authUserRepository.findByEmail(email);

      if (
        !user ||
        !(await this._hashService.compare(password, user.password))
      ) {
        throw new CustomError(
          "Invalid logging credentials",
          statusCodes.BAD_REQUEST
        );
      }

      if (user.status === "locked") {
        console.warn(`Login blocked: Account locked -> UserID: ${user.id}`);
        throw new CustomError(
          "Your account is temporarily locked. Contact support.",
          statusCodes.FORBIDDEN
        );
      }

      const tokenPayload: IJwtTokenPayload = {
        jti: this._tokenService.generateTokenId(),
        sub: user.id,
        scope: user.role,
      };

      const accessToken = this._tokenService.signAccessToken(tokenPayload);
      const refreshToken = this._tokenService.signRefreshToken(tokenPayload);

      const AuthUserDTO = AuthUserDtoProfile.toDto(user);
      return { user: AuthUserDTO, accessToken, refreshToken };
    } catch (error) {
      if (error instanceof CustomError) throw error;

      // INTERNAL ERROR — Log and respond sanitized
      console.error("Login Internal Error:", error);

      throw new CustomError(
        "We are unable to process your request at the moment. Please try again later.",
        statusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async register(payload: RegisterRequestDTO): Promise<{email:string,name:string}> {
    try {
      // 1. Validate input with Zod
      const validationResult = RegisterWithConfirmSchema.safeParse(payload);
      if (!validationResult.success) {
        const firstError = validationResult.error.issues[0];
        throw new CustomError(firstError.message, statusCodes.BAD_REQUEST);
      }

      const validatedData = validationResult.data;
      

      // 2. Check if user already exists
      const existingUser = await this._authUserRepository.findByEmail(validatedData.email);
      if (existingUser) {
        throw new CustomError(
          "User already exists with this email",
          statusCodes.BAD_REQUEST
        );
      }

      // 3. Check if phone number already registered
      const existingPhone = await this._authUserRepository.findOne({
        phone: validatedData.phone,
      });
      if (existingPhone) {
        throw new CustomError(
          "User already exists with this phone number",
          statusCodes.BAD_REQUEST
        );
      }

      // 4. Check for ongoing temporary registration
      const tempUser = await redis.get(`temp:registration:${validatedData.email}`);
      if (tempUser) {
        const tempData = JSON.parse(tempUser);
        const remainingMs = tempData.expiresIn - Date.now();
        const timeLeft = Math.ceil(remainingMs / (1000 * 60)); // minutes left
        throw new CustomError(
          `Registration already in progress. Please check your email or try again in ${timeLeft} minutes.`,
          statusCodes.BAD_REQUEST
        );
      }

      // 5. Create temporary registration entry
      const hashedPassword = await this._hashService.hash(
        validatedData.password
      );

      const verificationToken = this._tokenService.signAccessToken(
        {
          sub: validatedData.email,
          jti: this._tokenService.generateTokenId(),
          scope: Roles.CUSTOMER,
        },
        "1d" 
      );

      const tempRegistrationData = {
        ...validatedData,
        email: validatedData.email,
        password: hashedPassword,
        verificationToken,
        expiresIn: Date.now() + 24 * 60 * 60 * 1000,
      };

      await redis.setex(
        `temp:registration:${validatedData.email}`,
        24 * 60 * 60,
        JSON.stringify(tempRegistrationData)
      );

      // // 6. Send verification email (wrapped in try/catch to avoid breaking flow)

      return {
        email: validatedData.email,
      name: `${validatedData.personalInfo.firstName} ${validatedData.personalInfo.lastName}`,
      }

      
    } catch (error) {
      if (error instanceof CustomError) throw error;
      console.error("Registration error:", error);
      throw new CustomError(
        "Registration failed. Please try again.",
        statusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}
