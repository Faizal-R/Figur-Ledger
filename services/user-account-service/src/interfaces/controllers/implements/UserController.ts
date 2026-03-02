import { Request, Response } from "express";
import { IUserController } from "../interfaces/IUserController";
import { statusCodes } from "@figur-ledger/shared";
import { UserMessages } from "./UserMessages";
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
    private readonly _userUseCase: IUserUseCase,
  ) {}
  getUserProfile = tryCatch(async (req: Request, res: Response) => {
    const { userId } = req.params;
    if (!userId) {
      createResponse(
        res,
        statusCodes.BAD_GATEWAY,
        false,
        UserMessages.USER_ID_REQUIRED,
        null,
      );
    }
    const userProfile = await this._userUseCase.getUserProfile(userId as string);

    createResponse(
      res,
      statusCodes.SUCCESS,
      true,
      UserMessages.PROFILE_FETCHED,
      userProfile,
    );
  });
  updateUserProfile = tryCatch(async (req: Request, res: Response) => {
    const { userId } = req.params;
    if (!userId) {
      createResponse(
        res,
        statusCodes.BAD_GATEWAY,
        false,
        UserMessages.USER_ID_REQUIRED,
        null,
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
        null,
      );
      return;
    }
    const updatedProfile = await this._userUseCase.updateUserProfile(
      userId as string,
      updateData,
    );
    createResponse(
      res,
      statusCodes.SUCCESS,
      true,
      UserMessages.PROFILE_UPDATED,
      updatedProfile,
    );
  });

  createUser = tryCatch(async (req: Request, res: Response) => {
    const { email, phone, authUserId, personalInfo } = req.body;
    if (!email || !phone || !authUserId || !personalInfo) {
      createResponse(
        res,
        statusCodes.BAD_REQUEST,
        false,
        UserMessages.REQUIRED_FIELDS_MISSING,
        null,
      );
      return;
    }
    const createdUser = await this._userUseCase.createUser({
      email,
      phone,
      authUserId,
      personalInfo,
    });
    createResponse(
      res,
      statusCodes.CREATED,
      true,
      UserMessages.USER_CREATED,
      createdUser,
    );
  });
}
