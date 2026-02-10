import { injectable } from "inversify";
import { IInvoice, Invoice } from "../../models/Invoice";
import { IInvoiceRepository } from "../interfaces/IInvoiceRepository";
import { BaseRepository } from "./BaseRepository";

@injectable()
export class InvoiceRepository extends BaseRepository<IInvoice> implements IInvoiceRepository{
    constructor(){
        super(Invoice)
    }
}