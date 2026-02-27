import { injectable } from "inversify";
import { IUsersSavedBillers, UsersSavedBillers } from "../../models/UsersSavedBillers";
import { IUsersSavedBillersRepository } from "../interfaces/IUsersSavedBillersRepository";
import { BaseRepository } from "./BaseRepository";
@injectable()
export class UsersSavedBillersRepository extends BaseRepository<IUsersSavedBillers> implements IUsersSavedBillersRepository {
  constructor() {
    super(UsersSavedBillers);
  }
}