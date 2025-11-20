import {Request, Response } from "express";
import { AuthUser } from "../../../domain/entities/AuthUser";

export default interface IAuthController {
  login(req:Request,res:Response): Promise<void>;
  register(req:Request,res:Response): Promise<void>;
  logout(req:Request,res:Response):Promise<void>
  verifyOtp(req:Request,res:Response):Promise<void>
  refreshAccessToken(req:Request,res:Response):Promise<void>
}