import { injectable, inject } from "inversify";
import IAuthUseCases from "../../application/useCases/interfaces/IAuthUseCases";
import IAuthController from "./interfaces/IAuthController";
import { DI_TOKENS } from "../../di/types";
import { createResponse, tryCatch } from "@figur-ledger/handlers";
import { Request, Response } from "express";
import { statusCodes } from "@figur-ledger/types";
import { loginSchema } from "../validations/AuthUserSchema";


@injectable()
export default class AuthController implements IAuthController {
  constructor(
    @inject(DI_TOKENS.USE_CASES.AUTH_USE_CASES)
    private readonly _authUseCases: IAuthUseCases
  ) {}

  login = tryCatch(async (req: Request, res: Response) => {
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

    createResponse(res, statusCodes.SUCCESS, true, "LoggedInSuccessful", {
      accessToken,
      user,
    });
  });
  register = tryCatch(async (req: Request, res: Response) => {
    res.json({
      message:1
    })
  });

  logout = tryCatch(async (req: Request, res: Response) => {});
}
