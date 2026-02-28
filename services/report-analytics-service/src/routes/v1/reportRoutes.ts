import { Router } from "express";
import { resolve } from "../../di";
import { DI_TOKENS } from "../../di/types";
import { IReportController } from "../../controllers/interfaces/IReportController";

const router = Router();
const reportController = resolve<IReportController>(
  DI_TOKENS.CONTROLLERS.REPORT_CONTROLLER,
);

router.get("/accounts/:accountId/statement", reportController.generateReport);
router.get("/", reportController.getReports);
router.get("/:id", reportController.getReport);

export default router;
