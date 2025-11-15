import { Request, Response } from "express";
import { IUserController } from "../interfaces/IUserController";
import { statusCodes } from "@figur-ledger/types";
import { inject, injectable } from "inversify";
import { DI_TOKENS } from "../../../di/types";
import { IUserUseCase } from "../../../interator/useCases/interfaces/IUserUseCase";
import { createResponse } from "@figur-ledger/handlers";

import { userProfileSchema } from "../../validations/user/UserProfileSchema";
import { tryCatch } from "@figur-ledger/handlers";
@injectable()
export class UserController implements IUserController {
  constructor(
    @inject(DI_TOKENS.USECASES.USER_USECASE)
    private readonly _userUseCase: IUserUseCase
  ) {}
  getUserProfile = tryCatch(async (req: Request, res: Response) => {
    const { userId } = req.params;
    if (!userId) {
      createResponse(
        res,
        statusCodes.BAD_GATEWAY,
        false,
        "User Id is required",
        null
      );
    }
    const userProfile = await this._userUseCase.getUserProfile(userId);

    createResponse(
      res,
      statusCodes.SUCCESS,
      true,
      "User Profile fetched successfully",
      userProfile
    );
  });
  updateUserProfile = tryCatch(async (req: Request, res: Response) => {
    const { userId } = req.params;
    if (!userId) {
      createResponse(
        res,
        statusCodes.BAD_GATEWAY,
        false,
        "User Id is required",
        null
      );
      return;
    }

    const updateData = req.body;
    const validatedData = userProfileSchema.safeParse(updateData);
    console.log(validatedData.error?.issues);
    if (!validatedData.success) {
      createResponse(
        res,
        statusCodes.BAD_REQUEST,
        false,
        validatedData.error.issues[0].message,
        null
      );
      return;
    }
    const updatedProfile = await this._userUseCase.updateUserProfile(
      userId,
      updateData
    );
    createResponse(
      res,
      statusCodes.SUCCESS,
      true,
      "User Profile updated successfully",
      updatedProfile
    );
  });
}
