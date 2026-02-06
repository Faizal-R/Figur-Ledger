import { ICreditProfile } from "../../models/CreditProfile";

export interface ICreditProfileService {
  createCreditProfile(userId: string): Promise<ICreditProfile>;
  updateCreditProfile(
    userId: string,
    creditProfile: Partial<ICreditProfile>
  ): Promise<ICreditProfile | null>;
  getCreditProfile(userId: string): Promise<ICreditProfile | null>;
}
