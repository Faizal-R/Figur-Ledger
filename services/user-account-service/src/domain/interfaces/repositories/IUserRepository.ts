import { IBaseRepository } from "@figur-ledger/shared";
import { User } from "../../entities/User";

export interface IUserRepository extends IBaseRepository<User> {
    getUserStats(): Promise<{ count: number }>;
}