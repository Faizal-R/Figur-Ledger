import { RabbitConsumer } from "@figur-ledger/messaging-sdk";
import { DI_TOKENS } from "../../di/types";
import { inject, injectable } from "inversify";
import { ICreditProfileService } from "../../services/interfaces/ICreditProfileService";


@injectable()
export class CreditProfileConsumer {
    private queue="create.credit-profile";
    constructor(@inject(DI_TOKENS.SERVICES.CREDIT_PROFILE_SERVICE) private readonly _creditProfileService:ICreditProfileService) {
        
    }
    async start() {
        await RabbitConsumer(this.queue,async (message:string)=>{
           const paredData:{userId:string}=JSON.parse(message)
            await this._creditProfileService.createCreditProfile(paredData.userId)
        })
    }
}
