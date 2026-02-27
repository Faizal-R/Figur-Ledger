import { Biller, IBiller } from "../../models/Biller";
import { IBillerRepository } from "../interfaces/IBillerRepository";
import { BaseRepository } from "./BaseRepository";

export class BillerRepository
  extends BaseRepository<IBiller>
  implements IBillerRepository
{
  constructor() {
    super(Biller);
  }
}
