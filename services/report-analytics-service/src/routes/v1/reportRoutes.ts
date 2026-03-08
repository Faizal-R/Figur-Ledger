import { Router } from "express";
import { resolve } from "../../di";
import { DI_TOKENS } from "../../di/types";
import { IReportController } from "../../controllers/interfaces/IReportController";

const router = Router();
const reportController = resolve<IReportController>(
  DI_TOKENS.CONTROLLERS.REPORT_CONTROLLER,
);

router.get("/accounts/:accountId/statement", reportController.getGeneratedStatement);



export default router;
