-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('DEPOSIT', 'WITHDRAW', 'TRANSFER');

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "referenceId" TEXT NOT NULL,
    "idempotencyKey" TEXT NOT NULL,
    "senderAccountId" TEXT,
    "receiverAccountId" TEXT,
    "amount" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL,
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "type" "TransactionType" NOT NULL,
    "failureReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_idempotencyKey_key" ON "Transaction"("idempotencyKey");

-- CreateIndex
CREATE INDEX "Transaction_referenceId_idx" ON "Transaction"("referenceId");

-- CreateIndex
CREATE INDEX "Transaction_senderAccountId_idx" ON "Transaction"("senderAccountId");

-- CreateIndex
CREATE INDEX "Transaction_receiverAccountId_idx" ON "Transaction"("receiverAccountId");

-- CreateIndex
CREATE INDEX "Transaction_status_idx" ON "Transaction"("status");

-- CreateIndex
CREATE INDEX "Transaction_type_idx" ON "Transaction"("type");
