
import AccountModel from "../models/AccountModel";
import {Account} from "../../domain/entities/Account";
import { IAccountRepository } from "../../domain/interfaces/repositories/IAccountRepository";
import { inject, injectable } from "inversify";
import { BaseRepository, IMapper } from "@figur-ledger/shared";
import { IAccountDocument } from "../models/interfaces/IAccountModel";
import { DI_TOKENS } from "../../di/types";
@injectable()
export class AccountRepository
  extends BaseRepository<Account, IAccountDocument>
  implements IAccountRepository
{
  constructor(
    @inject(DI_TOKENS.MAPPERS.ACCOUNT_PERSISTENCE_MAPPER)
    private readonly _mapper: IMapper<Account, IAccountDocument> 
  ) {
    super(AccountModel, _mapper);
  }

  async getAccountsByUserId(userId: string): Promise<Account[]> {
    const docs = await this.model.find({ userId }).exec();
    return docs.map((d) => this.mapper.toDomain(d));
  }
}
