import { Request, Response } from "express";
import { tryCatch } from "../../../helpers/handlers/tryCatch";
import { IAuthController } from "../interfaces/IAuthController";
import { IAuthUseCase } from "../../../interator/useCases/interfaces/IAuthUseCase";
import { inject, injectable } from "inversify";
import { DI_TOKENS } from "../../../di/types";
import { createResponse } from "../../../helpers/handlers/response";
import {
  userLoginSchema,
  userRegisterSchema,
} from "../../validations/auth/AuthSchema";
import { HTTP_STATUS_CODE } from "../../../domain/enums/HttpStatusCodes";

@injectable()
export class AuthController implements IAuthController {
  constructor(
    @inject(DI_TOKENS.USECASES.AUTH_USECASE)
    private _authUseCase: IAuthUseCase
  ) {}
  login = tryCatch(async (req: Request, res: Response) => {
    const {
      data: loginInput,
      error,
      success,
    } = userLoginSchema.safeParse(req.body);
    if (!success) {
      return createResponse(res,HTTP_STATUS_CODE.BAD_REQUEST, false, error.issues[0].message, null);
    }

    const {user, accessToken, refreshToken} = await this._authUseCase.login(loginInput);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
    });
    createResponse(res, HTTP_STATUS_CODE.SUCCESS, true, "Login successful", user);
  });
  register = tryCatch(async (req: Request, res: Response) => {
    const {
      success,
      data: validatedInput,
      error,
    } = userRegisterSchema.safeParse(req.body);
    if (!success) {
      console.log(error);
      return createResponse(res, 400, false, error.issues[0].message, null);
    }

    const user = await this._authUseCase.register(validatedInput);
    createResponse(res, HTTP_STATUS_CODE.CREATED, true, "Registration successful", user);
  });
}
