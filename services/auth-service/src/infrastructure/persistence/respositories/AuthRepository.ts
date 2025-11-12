
import { injectable, inject } from "inversify";
import { BaseRepository, IMapper } from "@figur-ledger/shared";
import { AuthUser } from "../../../domain/entities/AuthUser";
import { IAuthUserRepository } from "../../../domain/interfaces/reposiotries/IAuthUserRepository";
import AuthUserModel from "../models/AuthUserModel";
import { AuthUserDocument } from "../interfaces/IAuthUserModel";
import { DI_TOKENS } from "../../../di/types";

@injectable()
export class AuthUserRepository
  extends BaseRepository<AuthUser, AuthUserDocument>
  implements IAuthUserRepository
{
  constructor(
    @inject(DI_TOKENS.MAPPERS.USER_PERSISTENCE_MAPPER)
    mapper: IMapper<AuthUser, AuthUserDocument>
  ) {
    super(AuthUserModel, mapper);
  }

  async findByEmail(email: string): Promise<AuthUser | null> {
    const doc=await  this.model.findOne({ email });
    return doc ? this.mapper.toDomain(doc) : null;
  }
}
