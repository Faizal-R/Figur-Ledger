import { Document } from "mongoose";
import { IUser } from "../../domain/entities/IUser";
import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";
import User from "../models/User";
import { BaseRepository } from "./BaseRepository";
import { injectable } from "inversify";


@injectable()
export class UserRepository extends BaseRepository<IUser> implements IUserRepository {
    constructor() {
        super(User);
    }
}
