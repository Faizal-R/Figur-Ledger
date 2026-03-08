import { inject, injectable } from "inversify";
import { IAccountServiceClient } from "../../config/http/interfaces/IAccountServiceClient";
import { IUserServiceClient } from "../../config/http/interfaces/IUserServiceClient";
import { BILLER_CATEGORIES, IBiller } from "../../models/Biller";
import { IBillerService } from "../interfaces/IBillerService";
import { DI_TOKENS } from "../../di/types";
import { IBillerRepository } from "../../repositories/interfaces/IBillerRepository";
import { IUsersSavedBillers } from "../../models/UsersSavedBillers";
import { IUsersSavedBillersRepository } from "../../repositories/interfaces/IUsersSavedBillersRepository";

@injectable()
export class BillerService implements IBillerService {
  constructor(
    @inject(DI_TOKENS.CLIENTS.USER_SERVICE_CLIENT)
    private _userServiceClient: IUserServiceClient,
    @inject(DI_TOKENS.CLIENTS.ACCOUNT_SERVICE_CLIENT)
    private _accountServiceClient: IAccountServiceClient,
    @inject(DI_TOKENS.REPOSITORIES.BILLER_REPOSITORY)
    private _billerRepository: IBillerRepository,
    @inject(DI_TOKENS.REPOSITORIES.USERS_SAVED_BILLERS_REPOSITORY)
    private _usersSavedBillersRepository: IUsersSavedBillersRepository,
  ) {}

  async createBiller({
    name,
    category,
    email,
    phone,
  }: {
    name: string;
    category: string;
    email: string;
    phone: string;
  }): Promise<IBiller> {
    try {
      const userServiceResponse = await this._userServiceClient.createUser({
        email,
        phone: Number(phone),
        authUserId: crypto.randomUUID(),
        personalInfo: {
          firstName: name,
        },
      });
      console.log("User Service Response:", userServiceResponse);

      const createdUserId = userServiceResponse.data.id;
      const accountServiceResponse =
        await this._accountServiceClient.createAccount(
          createdUserId,
          "biller_collection",
          "Biller Collection Account",
        );
      console.log("Account Service Response:", accountServiceResponse);
      const createdAccountId = accountServiceResponse.data.id;
      const biller = {
        billerId: createdUserId,
        name,
        category: category as keyof typeof BILLER_CATEGORIES,
        collectionAccountId: createdAccountId,
        validationPattern: "",
        contact: {
          email,
          phone,
        },
        fixedAmounts: [],
        isActive: true,
      };

      const createdBiller = await this._billerRepository.create(biller);
      console.log("Created Biller:", createdBiller);
      return createdBiller;
    } catch (error) {
      console.log("Error creating biller:");
      throw error;
    }
  }

  getAllBillers(category?: string): Promise<IBiller[]> {
    try {
      if (category !== "ALL") {
        return this._billerRepository.find({
          category,
        });
      }

      return this._billerRepository.find();
    } catch (error) {
      console.error({
        scope: "SERVICE",
        method: "getAllBillers",
        action: "FETCH_BILLERS",
        status: "FAILED",
        error: {
          message: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
        },
      });
      throw error;
    }
  }

  saveBiller(data: Partial<IUsersSavedBillers>): Promise<IUsersSavedBillers> {
    try {
      return this._usersSavedBillersRepository.create(data);
    } catch (error) {
      console.error({
        scope: "SERVICE",
        method: "saveBiller",
        action: "SAVE_BILLER",
        status: "FAILED",
        error: {
          message: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
        },
      });
      throw error;
    }
  }

  getAllSavedBillers(
    userId: string,
    category: string,
  ): Promise<IUsersSavedBillers[]> {
    try {
      if (category !== "ALL") {
        return this._usersSavedBillersRepository.find({ userId, category });
      }
      return this._usersSavedBillersRepository.find({ userId });
    } catch (error) {
      console.error({
        scope: "SERVICE",
        method: "getAllSavedBillers",
        action: "FETCH_SAVED_BILLERS",
        status: "FAILED",
        error: {
          message: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
        },
      });
      throw error;
    }
  }

  async getBillerStats(): Promise<any> {
    try {
      const [count, billers] = await Promise.all([
        this._billerRepository.count(),
        this._billerRepository.find({}, 5, { createdAt: -1 })
      ]);

      return { 
        count,
        list: billers.map(b => ({
          id: (b as any).billerId,
          name: (b as any).name,
          category: (b as any).category,
          status: (b as any).isActive ? 'ACTIVE' : 'INACTIVE',
          volume: '₹0', // Volume would require transaction service join, mock for now
          growth: '+0%'
        }))
      };
    } catch (error) {
      console.error("Error fetching biller stats:", error);
      throw error;
    }
  }
}
