import { Response,Request } from "express";
export interface IBillController{
    getUtilityBills(req:Request,res:Response): Promise<void>;
}