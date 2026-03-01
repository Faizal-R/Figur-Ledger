-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "TransactionStatus" ADD VALUE 'DEBIT_SUCCESS';
ALTER TYPE "TransactionStatus" ADD VALUE 'CREDIT_SUCCESS';
ALTER TYPE "TransactionStatus" ADD VALUE 'ROLLED_BACK';
ALTER TYPE "TransactionStatus" ADD VALUE 'MANUAL_REVIEW';
