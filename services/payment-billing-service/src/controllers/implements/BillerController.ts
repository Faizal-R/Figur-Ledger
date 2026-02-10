import { inject, injectable } from "inversify";
import { IBillerController } from "../interfaces/IBillerController";
import { Response, Request } from "express";
import { tryCatch, createResponse } from "@figur-ledger/handlers";
import { DI_TOKENS } from "../../di/types";
import { IBillerService } from "../../services/interfaces/IBillerService";
import { statusCodes } from "@figur-ledger/shared";
@injectable()
export class BillerController implements IBillerController {
  constructor(
    @inject(DI_TOKENS.SERVICES.BILLER_SERVICE)
    private _billerService: IBillerService,
  ) {}
  getAllBillers = tryCatch(async (req: Request, res: Response) => {
    const { category } = req.query;
    console.log("category", category);
    const billers = await this._billerService.getAllBillers(category as string);
    createResponse(
      res,
      statusCodes.SUCCESS,
      true,
      "Billers fetched successfully",
      billers,
    );
  });
  createBiller = tryCatch(async (req: Request, res: Response) => {
    const {
      name,
      category,
      contactEmail: email,
      contactPhone: phone,
    } = req.body;
    console.log("req.body", req.body);
    //TODO : basic validation

    const createdBiller = await this._billerService.createBiller({
      name,
      category,
      email,
      phone,
    });
    createResponse(
      res,
      statusCodes.CREATED,
      true,
      "Biller created successfully",
      createdBiller,
    );
  });

  updateBiller = tryCatch(async (req: Request, res: Response) => {
    // Implement update biller logic here
  });

  deleteBiller = tryCatch(async (req: Request, res: Response) => {
    // Implement delete biller logic here
  });

  saveBiller = tryCatch(async (req: Request, res: Response) => {
    console.log("Saving biller body:", req.body);
    const savedBiller = await this._billerService.saveBiller(req.body);
    createResponse(
      res,
      statusCodes.SUCCESS,
      true,
      "Biller saved successfully",
      savedBiller,
    );
  });

  getAllSavedBillers = tryCatch(async (req: Request, res: Response) => {
    const { userId, category } = req.query;
    console.log(
      "Fetching saved billers for userId:",
      userId,
      "category:",
      category,
    );
    const savedBillers = await this._billerService.getAllSavedBillers(
      userId as string,
      category as string,
    );
    createResponse(
      res,
      statusCodes.SUCCESS,
      true,
      "Saved billers fetched successfully",
      savedBillers,
    );
  });
}
