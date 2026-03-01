import { Prisma } from "@prisma/client";
import { ITransactionFilters } from "../../types/ITransactionFilters";

export function buildQuery(accountId: string, filters: ITransactionFilters) {
  const where: Prisma.TransactionWhereInput = {
    OR: [{ senderAccountId: accountId }, { receiverAccountId: accountId }],
  };

  if (filters) {
    if (filters.type && filters.type !== "ALL") where.type = filters.type;
    if (filters.status && filters.status !== "ALL")
      where.status = filters.status;
    if (filters.startDate || filters.endDate) {
      where.createdAt = {};
      if (filters.startDate) where.createdAt.gte = new Date(filters.startDate);
      if (filters.endDate) where.createdAt.lte = new Date(filters.endDate);
    }
    if (filters.minAmount || filters.maxAmount) {
      where.amount = {};
      if (filters.minAmount) where.amount.gte = Number(filters.minAmount);
      if (filters.maxAmount) where.amount.lte = Number(filters.maxAmount);
    }
  }

  let orderBy: Prisma.TransactionOrderByWithRelationInput = { createdAt: "desc" };
  if (filters?.sortBy) {
    const [field, order] = filters.sortBy.split("_");
    const prismaField = field === "DATE" ? "createdAt" : "amount";
    orderBy = { [prismaField]: order.toLowerCase() };
  }

  return { where, orderBy };
}
