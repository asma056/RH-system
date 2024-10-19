/*
  Warnings:

  - You are about to drop the column `updateAt` on the `BankAccountInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BankAccountInfo" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" DATE DEFAULT CURRENT_TIMESTAMP;
