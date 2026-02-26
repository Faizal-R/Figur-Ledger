import IAuthUseCases from "./interfaces/IAuthUseCases";
import { injectable, inject } from "inversify";
import { DI_TOKENS } from "../../di/types";
import { IAuthUserRepository } from "../../domain/interfaces/reposiotries/IAuthUserRepository";
import { AuthUserResponseDTO } from "../dto/response/AuthUserDTO";
import { CustomError } from "@figur-ledger/utils";
import { Roles, statusCodes, TokenErrorCode } from "@figur-ledger/shared";
import IHashService from "../../domain/interfaces/services/IHashService";
import IJwtTokenService from "../../domain/interfaces/services/IJwtTokenService";
import { IJwtTokenPayload } from "../../types/IJwt";
import AuthUserDtoProfile from "../profiles/AuthUserDtoProfile";
import { redis } from "@figur-ledger/shared";
import { RegisterRequestDTO } from "../dto/request/RegisterRequestDTO";
import { RabbitPublisher } from "@figur-ledger/messaging-sdk";
import { generateOTP } from "../helpers/generateOtp";
import { RedisKeys } from "../../infrastructure/constants/RedisKeys";
import { AuthUser } from "../../domain/entities/AuthUser";
import { AuthMessages } from "../../infrastructure/constants/AuthMessages";
import { CommonMessages } from "@figur-ledger/shared";

@injectable()
export default class AuthUseCases implements IAuthUseCases {
  constructor(
    @inject(DI_TOKENS.REPOSITORIES.AUTH_USER_REPOSITORY)
    private _authUserRepository: IAuthUserRepository,
    @inject(DI_TOKENS.SERVICES.HASH_SERVICE) private _hashService: IHashService,
    @inject(DI_TOKENS.SERVICES.JWT_TOKEN_SERVICE)
    private _tokenService: IJwtTokenService,
  ) {}

  async login(
    email: string,
    password: string,
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
          AuthMessages.INVALID_CREDENTIALS,
          statusCodes.BAD_REQUEST,
        );
      }

      if (user.status === "locked") {
        console.warn(`Login blocked: Account locked -> UserID: ${user.id}`);
        throw new CustomError(
          AuthMessages.ACCOUNT_LOCKED,
          statusCodes.FORBIDDEN,
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
        CommonMessages.INTERNAL_SERVER_ERROR,
        statusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async register(
    payload: RegisterRequestDTO,
  ): Promise<{ email: string; name: string }> {
    try {
      // 2. Check if user already exists
      const existingUser = await this._authUserRepository.findByEmail(
        payload.email,
      );
      if (existingUser) {
        throw new CustomError(
          AuthMessages.USER_EXISTS_EMAIL,
          statusCodes.BAD_REQUEST,
        );
      }

      // 3. Check if phone number already registered
      const existingPhone = await this._authUserRepository.findOne({
        phone: payload.phone,
      });
      if (existingPhone) {
        throw new CustomError(
          AuthMessages.USER_EXISTS_PHONE,
          statusCodes.BAD_REQUEST,
        );
      }

      // 4. Check for ongoing temporary registration
      const tempUser = await redis.get(
        RedisKeys.TEMP_REGISTRATION(payload.email),
      );
      if (tempUser) {
        const tempData = JSON.parse(tempUser);
        const remainingMs = tempData.expiresIn - Date.now();
        const timeLeft = Math.ceil(remainingMs / (1000 * 60)); // minutes left
        throw new CustomError(
          AuthMessages.REGISTRATION_IN_PROGRESS,
          statusCodes.BAD_REQUEST,
        );
      }

      // 5. Create temporary registration entry
      const hashedPassword = await this._hashService.hash(payload.password);
      const verificationTokenExpiry = process.env.VERIFICATION_TOKEN_EXPIRY;
      const verificationToken = this._tokenService.signAccessToken(
        {
          sub: payload.email,
          jti: this._tokenService.generateTokenId(),
          scope: Roles.CUSTOMER,
        },
        verificationTokenExpiry,
      );

      const tempRegistrationData = {
        tempUser: {
          ...payload,
          password: hashedPassword,
        },
        verificationToken,
        expiresIn: Date.now() + 24 * 60 * 60 * 1000,
      };

      await redis.setex(
        RedisKeys.TEMP_REGISTRATION(payload.email),
        24 * 60 * 60,
        JSON.stringify(tempRegistrationData),
      );

      const otp = generateOTP();
      await redis.setex(
        RedisKeys.VERIFICATION_CODE(payload.email),
        60 * 10,
        otp,
      );

      // // 6. Send verification email
      RabbitPublisher(
        "user.registered",
        JSON.stringify({
          email: payload.email,
          otp,
        }),
      );

      return {
        email: payload.email,
        name: `${payload.personalInfo.firstName} ${payload.personalInfo.lastName}`,
      };
    } catch (error) {
      if (error instanceof CustomError) throw error;
      console.error("Registration error:", error);
      throw new CustomError(
        AuthMessages.REGISTRATION_FAILED,
        statusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async verifyOtp(
    email: string,
    otp: string,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    user: AuthUserResponseDTO;
  }> {
    try {
      const existingOtp = await redis.get(RedisKeys.VERIFICATION_CODE(email));
      console.log(existingOtp);
      if (!existingOtp) {
        throw new CustomError(
          AuthMessages.OTP_EXPIRED,
          statusCodes.BAD_REQUEST,
        );
      }

      if (existingOtp !== otp) {
        throw new CustomError(
          AuthMessages.INCORRECT_OTP,
          statusCodes.BAD_REQUEST,
        );
      }

      // Remove OTP after successful verification
      await redis.del(RedisKeys.VERIFICATION_CODE(email));
      const tempUser = await redis.get(RedisKeys.TEMP_REGISTRATION(email));
      if (!tempUser) {
      }

      const parsedData = JSON.parse(tempUser as string);

      const authUser: AuthUser = {
        ...parsedData.tempUser,
        role: Roles.CUSTOMER,
        status: "active",
        emailVerified: true,
      };

      const createdAuthUser = await this._authUserRepository.create(authUser);

      const accessToken = this._tokenService.signAccessToken({
        sub: createdAuthUser.id,
        jti: this._tokenService.generateTokenId(),
        scope: createdAuthUser.role,
      });

      const refreshToken = this._tokenService.signRefreshToken({
        sub: createdAuthUser.id,
        jti: this._tokenService.generateTokenId(),
        scope: createdAuthUser.role,
      });

      RabbitPublisher(
        "user.registration.verified",
        JSON.stringify({
          ...parsedData.tempUser,
          authUserId: createdAuthUser.id,
        }),
      );

      RabbitPublisher(
        "create.credit-profile",
        JSON.stringify({
          userId: createdAuthUser.id,
        }),
      );

      return {
        accessToken,
        refreshToken,
        user: AuthUserDtoProfile.toDto(createdAuthUser),
      };
    } catch (error) {
      if (error instanceof CustomError) throw error;
      console.error("OTP verification error:", error);
      throw new CustomError(
        AuthMessages.OTP_VERIFICATION_FAILED,
        statusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async refreshAccessToken(
    refreshToken: string,
  ): Promise<{ accessToken: string }> {
    try {
      const payload = this._tokenService.verifyRefreshToken(refreshToken);

      const accessToken = this._tokenService.signAccessToken({
        sub: payload.sub,
        scope: payload.scope,
        jti: this._tokenService.generateTokenId(),
      });

      return { accessToken };
    } catch (error) {
      if (error instanceof CustomError) {
        switch (error.code) {
          case TokenErrorCode.REFRESH_TOKEN_EXPIRED:
            throw new CustomError(
              CommonMessages.UNAUTHORIZED,
              401,
              TokenErrorCode.REFRESH_TOKEN_EXPIRED,
            );

          case TokenErrorCode.REFRESH_TOKEN_INVALID:
            throw new CustomError(
              AuthMessages.SESSION_INVALID,
              401,
              TokenErrorCode.REFRESH_TOKEN_INVALID,
            );
        }
      }
      throw new CustomError(
        AuthMessages.REFRESH_FAILED,
        400,
        TokenErrorCode.REFRESH_TOKEN_FAILED,
      );
    }
  }
}
