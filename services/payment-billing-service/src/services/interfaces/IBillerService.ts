import { IBiller } from "../../models/Biller";
import { IUsersSavedBillers } from "../../models/UsersSavedBillers";

export interface IBillerService {
  createBiller({
    name,
    category,
    email,
    phone,
  }: {
    name: string;
    category: string;
    email: string;
    phone: string;
  }): Promise<IBiller>;

  getAllBillers(category?: string): Promise<IBiller[]>;

  saveBiller(data: Partial<IUsersSavedBillers>): Promise<IUsersSavedBillers>;

  getAllSavedBillers(userId: string,category: string): Promise<IUsersSavedBillers[]>;
  getBillerStats(): Promise<any>;
}
