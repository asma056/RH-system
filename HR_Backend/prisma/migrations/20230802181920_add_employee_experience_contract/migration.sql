/*
  Warnings:

  - Added the required column `experienceContractFirstDue` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experienceContractSecondtDue` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "experienceContractFirstDue" TEXT NOT NULL,
ADD COLUMN     "experienceContractSecondtDue" TEXT NOT NULL;
