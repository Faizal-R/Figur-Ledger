import { Account } from "../../domain/entities/Account";
import { IAccountDocument } from "../models/interfaces/IAccountModel";
import { IMapper } from "@figur-ledger/shared";
import { Types } from "mongoose";

export class AccountPersistenceMapper
  implements IMapper<Account, IAccountDocument>
{
  toDomain(raw: IAccountDocument): Account {
    return new Account(
      raw._id.toString(),
      raw.userId.toString(),
      raw.accountNumber,
      raw.type,
      raw.balance,
      raw.currency,
      raw.status,
      raw.nickname,
      raw.ifsc,
      raw.interestRate,
      raw.minBalance,
      raw.createdAt?.toISOString(),
      raw.updatedAt?.toISOString()
    );
  }

  toPersistence(entity: Account): Partial<IAccountDocument> {
    return {
     userId: entity.userId ? new Types.ObjectId(entity.userId) : undefined,
      accountNumber: entity.accountNumber,
      type: entity.type,
      balance: entity.balance,
      currency: entity.currency,
      status: entity.status,
      nickname: entity.nickname,
      ifsc: entity.ifsc,
      interestRate: entity.interestRate,
      minBalance: entity.minBalance,
    };
  }
}
