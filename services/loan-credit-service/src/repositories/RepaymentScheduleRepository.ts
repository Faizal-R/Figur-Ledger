import {
  IRepaymentSchedule,
  RepaymentSchedule,
} from "../models/RepaymentSchedule";
import { BaseRepository } from "./BaseRepository";
import { IRepaymentScheduleRepository } from "./interfaces/IRepaymentScheduleRepository";
import { injectable } from "inversify";
@injectable()
export class RepaymentScheduleRepository
  extends BaseRepository<IRepaymentSchedule>
  implements IRepaymentScheduleRepository
{
  constructor() {
    super(RepaymentSchedule);
  }

  insertMany(docs: IRepaymentSchedule[]) {
    return this.model.insertMany(docs);
  }
}
