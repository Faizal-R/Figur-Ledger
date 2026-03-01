import { ICreditProfileService } from "./interfaces/ICreditProfileService";

import { ICreditProfileRepository } from "../repositories/interfaces/ICreditProfileRepository";
import { ICreditProfile } from "../models/CreditProfile";
import { inject, injectable } from "inversify";
import { DI_TOKENS } from "../di/types";
import { Types } from "mongoose";

@injectable()
export class CreditProfileService implements ICreditProfileService {
  constructor(
    @inject(DI_TOKENS.REPOSITORIES.CREDIT_PROFILE_REPOSITORY)
    private creditProfileRepository: ICreditProfileRepository
  ) {}
  createCreditProfile(
    userId:string
  ): Promise<ICreditProfile> {
    return this.creditProfileRepository.create({userId :new Types.ObjectId(userId)});
  }
  async updateCreditProfile(
    userId: string,
    creditProfile: Partial<ICreditProfile>
  ): Promise<ICreditProfile | null> {
    const cp = await this.creditProfileRepository.findOne({ userId });
    await this.creditProfileRepository.update(cp?.id!, creditProfile);
    return cp;
  }
  async getCreditProfile(userId: string): Promise<ICreditProfile | null> {
    return this.creditProfileRepository.findOne({ userId });
  }
}
