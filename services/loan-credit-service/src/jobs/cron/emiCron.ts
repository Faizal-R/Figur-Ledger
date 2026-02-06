import cron from "node-cron";
import { resolve} from "../../di" ;
import { DI_TOKENS } from "../../di/types";
import { IEmiService } from "../../services/interfaces/IEmiService";

export function startEmiCron() {
  console.log("[CRON] EMI cron registered");

  cron.schedule("0 10 5 * *", async () => {
    console.log("[CRON] EMI job started");

    const emiService = resolve<IEmiService>(
      DI_TOKENS.SERVICES.EMI_SERVICE
    );

    try {
      await emiService.processEmis();
      console.log("[CRON] EMI job completed");
    } catch (err) {
      console.error("[CRON] EMI job failed", err);
    }
  });
}

