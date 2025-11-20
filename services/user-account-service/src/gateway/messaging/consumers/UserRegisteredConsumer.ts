import { RabbitConsumer, RabbitMQ } from "@figur-ledger/messaging-sdk";
import { UserUseCase } from "../../../interator/useCases/implements/UserUseCase";
import { IUserUseCase } from "../../../interator/useCases/interfaces/IUserUseCase";
import { inject, injectable } from "inversify";
import { DI_TOKENS } from "../../../di/types";


@injectable()
export class UserRegisteredConsumer {
  private queue="user.registration.verified"
  constructor(@inject(DI_TOKENS.USECASES.USER_USECASE) private readonly _userUseCase:IUserUseCase) {

  }

  async start() {
   await RabbitConsumer(this.queue,async (message:string)=>{
      const paredData=JSON.parse(message)
      console.log(paredData)
      await this._userUseCase.createUser(paredData)
   })
  }
}
