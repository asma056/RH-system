/*
  Warnings:

  - Added the required column `accountNumber` to the `BankAccountInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BankAccountInfo" ADD COLUMN     "accountNumber" TEXT NOT NULL;
