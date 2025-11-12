import { Document } from "mongoose";
import { IUser } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";
import User from "../models/UserModel";
import { BaseRepository } from "@figur-ledger/shared";
import { injectable } from "inversify";


@injectable()
export class UserRepository extends BaseRepository<IUser> implements IUserRepository {
    constructor(private readonly mapper) {
        super(User,);
    }
}
