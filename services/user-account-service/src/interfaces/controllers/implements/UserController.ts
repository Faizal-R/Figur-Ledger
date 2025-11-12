import { Request, Response } from "express";
import { IUserController } from "../interfaces/IUserController";
import { tryCatch } from "../../../../../../packages/handlers/src/tryCatch/tryCatch";
import { inject, injectable } from "inversify";
import { DI_TOKENS } from "../../../di/types";
import { IUserUseCase } from "../../../interator/useCases/interfaces/IUserUseCase";
import { createResponse } from "../../../helpers/handlers/response";
import { HTTP_STATUS_CODE } from "../../../domain/enums/HttpStatusCodes";
import { userProfileSchema } from "../../validations/user/UserProfileSchema";
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
        HTTP_STATUS_CODE.BAD_GATEWAY,
        false,
        "User Id is required",
        null
      );
    }
    const userProfile = await this._userUseCase.getUserProfile(userId);

    createResponse(
      res,
      HTTP_STATUS_CODE.SUCCESS,
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
        HTTP_STATUS_CODE.BAD_GATEWAY,
        false,
        "User Id is required",
        null
      );
      return;
    }

    const updateData = req.body;
    const validatedData = userProfileSchema.safeParse(updateData);
    if (!validatedData.success) {
      createResponse(
        res,
        HTTP_STATUS_CODE.BAD_REQUEST,
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
      HTTP_STATUS_CODE.SUCCESS,
      true,
      "User Profile updated successfully",
      updatedProfile
    );
  });
}
