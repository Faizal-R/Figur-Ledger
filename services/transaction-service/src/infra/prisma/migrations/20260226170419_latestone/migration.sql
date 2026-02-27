-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "receiverBalanceAfter" DECIMAL(65,30),
ADD COLUMN     "senderBalanceAfter" DECIMAL(65,30);
