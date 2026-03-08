import { BaseRepository } from "./BaseRepository";

import { ILoanApplication } from "../models/LoanApplication";
import { LoanApplication } from "../models/LoanApplication";
import { ILoanApplicationRepository } from "./interfaces/ILoanApplicationRepository";
import { injectable } from "inversify";
@injectable()
export class LoanApplicationRepository
  extends BaseRepository<ILoanApplication>
  implements ILoanApplicationRepository
{
  constructor() {
    super(LoanApplication);
  }

  async getLoanStats() {
    const [totalLoans, statusResults, productResults]: [number, { _id: string; count: number }[], { name: string; count: number; volume: number }[]] = await Promise.all([
      this.model.countDocuments(),
      this.model.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]),
      this.model.aggregate([
        {
          $group: {
            _id: "$loanProductId",
            count: { $sum: 1 },
            volume: {
              $sum: {
                $cond: [
                  { $in: ["$status", ["APPROVED", "DISBURSED", "ACTIVE", "CLOSED"]] },
                  "$approvedAmount",
                  0,
                ],
              },
            },
          },
        },
        {
          $lookup: {
            from: "loanproducts",
            localField: "_id",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },
        {
          $project: {
            _id: 0,
            name: "$product.name",
            count: 1,
            volume: 1,
          },
        },
      ]),
    ]);

    const health = [
      {
        name: "Approved",
        value: statusResults
          .filter((r) => ["APPROVED", "DISBURSED", "ACTIVE", "CLOSED"].includes(r._id))
          .reduce((sum, r) => sum + r.count, 0),
      },
      {
        name: "Rejected",
        value: statusResults.find((r) => r._id === "REJECTED")?.count || 0,
      },
      {
        name: "Pending",
        value: statusResults.find((r) => r._id === "APPLIED")?.count || 0,
      },
    ];

    return {
      totalLoans,
      health,
      productPerformance: productResults,
    };
  }
}
