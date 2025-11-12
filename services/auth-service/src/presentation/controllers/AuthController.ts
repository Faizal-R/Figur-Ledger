import { injectable, inject } from 'inversify'
import IAuthUseCases from "../../application/useCases/interfaces/IAuthUseCases"
import IAuthController from "./interfaces/IAuthController"
import { DI_TOKENS } from "../../di/types"
import {tryCatch} from '@figur-ledger/handlers'
import {  Request, Response } from 'express'

@injectable()
export default class AuthController implements IAuthController {

  constructor(
    @inject(DI_TOKENS.USE_CASES.AUTH_USE_CASES)
    private readonly authUseCases: IAuthUseCases
  ) {}

 login = tryCatch(
    async (req:Request,res:Response)=>{
      res.json({message:'login successfulsdfsdfsdfsdf'})
    }
  )
 register = tryCatch(
    async (req:Request,res:Response)=>{ }
  )

 logout = tryCatch(
    async (req:Request,res:Response)=>{}
  )


}
