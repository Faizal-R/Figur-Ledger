import { injectable, inject } from "inversify";
import IAuthUseCases from "../../application/useCases/interfaces/IAuthUseCases";
import IAuthController from "./interfaces/IAuthController";
import { DI_TOKENS } from "../../di/types";
import { createResponse, tryCatch } from "@figur-ledger/handlers";
import { Request, Response } from "express";
import { statusCodes } from "@figur-ledger/shared";
import {
  loginSchema,
  RegisterWithConfirmSchema,
} from "../validations/AuthUserSchema";

import { RegisterRequestDTO } from "../../application/dto/request/RegisterRequestDTO";
import { REFRESH_TOKEN_COOKIE_OPTIONS } from "../../application/config/cookieConfig";

/**
 * AuthController
 * ---------------
 * Orchestrates all authentication-related HTTP workflows.
 * Validates incoming requests, delegates business logic to AuthUseCases,
 * and standardizes API responses.
 *
 * Responsibilities:
 * - Request validation via Zod schemas
 * - Transforming + normalizing input payloads
 * - Delegating execution to domain-level use cases
 * - Managing auth cookies (refresh token)
 * - Sending consistent HTTP responses
 *
 * This controller MUST stay thin. No domain logic here.
 * All computation, verification, persistence, and token management
 * should be executed inside the injected AuthUseCases.
 */
@injectable()
export default class AuthController implements IAuthController {
  constructor(
    @inject(DI_TOKENS.USE_CASES.AUTH_USE_CASES)
    private readonly _authUseCases: IAuthUseCases
  ) {}
  /**
   * LOGIN
   * -----
   * Flow:
   * 1. Validate request body against loginSchema.
   * 2. Invoke AuthUseCases.login(email, password).
   * 3. Receive accessToken, refreshToken, and user DTO.
   * 4. Attach HttpOnly refresh token cookie.
   * 5. Return access token + user details in JSON response.
   *
   * Notes:
   * - Refresh token is stored in a secure cookie for rotation.
   * - Access token is returned in response for frontend storage.
   * - This endpoint should never return raw errors; use tryCatch wrapper.
   */

  login = tryCatch(async (req: Request, res: Response) => {
    console.log(req.body)
    const {
      success,
      error,
      data: validatedData,
    } = loginSchema.safeParse(req.body);
     
    if (!success) {
      return createResponse(
        res,
        statusCodes.BAD_REQUEST,
        false,
        error.issues[0].message
      );
    }

    const { accessToken, refreshToken, user } = await this._authUseCases.login(
      validatedData.email,
      validatedData.password
    );
    console.log("tokens",refreshToken)

  
    res.cookie("refreshToken", refreshToken,REFRESH_TOKEN_COOKIE_OPTIONS)

    createResponse(res, statusCodes.SUCCESS, true, "LoggedInSuccessful", {
      accessToken,
      user,
    });
  });

  /**
   * REGISTER
   * --------
   * Flow:
   * 1. Validate body using RegisterWithConfirmSchema.
   * 2. Pass sanitized DTO to AuthUseCases.register().
   * 3. Use case handles:
   *    - checking existing users
   *    - creating temporary registration record
   *    - generating OTP
   *    - dispatching verification email
   * 4. Return "registration initiated" response.
   *
   * This method NEVER finalizes registration.
   * Full activation happens only after OTP verification.
   */

  register = tryCatch(async (req: Request, res: Response) => {
    const payload: RegisterRequestDTO = req.body;
    console.log(payload);
    const { success, data , error } = RegisterWithConfirmSchema.safeParse(
      req.body
    );
    if (!success) {
      const firstError = error.issues[0];
      return createResponse(
        res,
        statusCodes.BAD_REQUEST,
        false,
        firstError.message
      );
    }

    const tempRegisteredUser = await this._authUseCases.register(data);

    return createResponse(
      res,
      statusCodes.CREATED,
      true,
      "Registration initiated. Proceed with email verification.",
      tempRegisteredUser
    );
  });

  /**
   * LOGOUT
   * ------
   * Flow:
   * - This should clear refresh token cookie.
   * - Optionally invalidate refresh token server-side (Redis blacklist or rotation strategy).
   * - Response should confirm logout success.
   *
   * Currently empty — implement once refresh token invalidation strategy is finalized.
   */

  logout = tryCatch(async (req: Request, res: Response) => {
    //  const refreshToken = req.cookies["refreshToken"];///

      // await this._authService.signout(refreshToken);
      // response.clearCookie(Tokens.ACCESS_TOKEN);

      res.clearCookie("refreshToken");

      return createResponse(
        res,
        statusCodes.SUCCESS,
        true,
        "User Logged out Successfully"
      );
  });
 
   /**
   * VERIFY OTP
   * ----------
   * Flow:
   * 1. Validate email + OTP presence and format.
   * 2. Normalize input (lowercase email, trim whitespace).
   * 3. Invoke AuthUseCases.verifyOtp().
   * 4. Use case handles:
   *    - matching OTP
   *    - promoting temp user → full user
   *    - generating access + refresh tokens
   *    - persisting refresh token metadata for rotation
   * 5. Return success response.
   *
   * Important:
   * - Zero business logic here; controller ONLY orchestrates.
   */
   
  verifyOtp = tryCatch(async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  // Basic payload validation
  if (!email || !otp) {
    return createResponse(
      res,
      statusCodes.BAD_REQUEST,
      false,
      "Email and OTP are required"
    );
  }

  if (typeof otp !== "string" || otp.trim().length !== 6) {
    return createResponse(
      res,
      statusCodes.BAD_REQUEST,
      false,
      "Invalid OTP format"
    );
  }

  // Normalize input
  const normalizedEmail = email.toLowerCase().trim();
  const normalizedOtp = otp.trim();

  // Orchestrate use-case
 const {accessToken,refreshToken,user}= await this._authUseCases.verifyOtp(normalizedEmail, normalizedOtp);
 
 res.cookie("refreshToken", refreshToken,REFRESH_TOKEN_COOKIE_OPTIONS)


  return createResponse(
    res,
    statusCodes.SUCCESS,
    true,
    "OTP verified successfully",
    {
      accessToken,
      user,
    }
  );
});

refreshAccessToken = tryCatch(async (req: Request, res: Response) => {
    const refreshToken = req.cookies["refreshToken"];
      if( !refreshToken){
        return createResponse(
          res,
          statusCodes.UNAUTHORIZED,
          false,
          "Session expired. Please log in again."
        );
      }



  })
}
