import { Document } from "mongoose";
import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";
import UserModel from "../models/UserModel";
import { BaseRepository, IMapper } from "@figur-ledger/shared";
import { inject, injectable } from "inversify";
import { IUserDocument } from "../models/interfaces/IUserModel";
import { DI_TOKENS } from "../../di/types";


@injectable()
export class UserRepository extends BaseRepository<User,IUserDocument> implements IUserRepository {
    constructor(@inject(DI_TOKENS.MAPPERS.USER_PERSISTENCE_MAPPER) private readonly __mapper:IMapper<User,IUserDocument>) {
        super(UserModel,__mapper);
    }

    async getUserStats() {
        const count = await this.model.countDocuments();
        return { count };
    }
}
