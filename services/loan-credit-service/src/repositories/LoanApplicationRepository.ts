import { BaseRepository } from "./BaseRepository";

import { ILoanApplication } from "../models/LoanApplication";
import { LoanApplication } from "../models/LoanApplication";
import { ILoanApplicationRepository } from "./interfaces/ILoanApplicationRepository";
import { injectable } from "inversify";
@injectable()
export class LoanApplicationRepository
  extends BaseRepository<ILoanApplication>
  implements ILoanApplicationRepository
{
  constructor() {
    super(LoanApplication);
  }
}
