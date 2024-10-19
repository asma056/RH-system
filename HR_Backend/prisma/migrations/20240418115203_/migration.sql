/*
  Warnings:

  - You are about to drop the column `experienceContractFirstDue` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `experienceContractSecondtDue` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `sweatshirtSize` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `tshirtSize` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the `BankAccountInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OccupationExam` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BankAccountInfo" DROP CONSTRAINT "BankAccountInfo_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "OccupationExam" DROP CONSTRAINT "OccupationExam_employeeId_fkey";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "experienceContractFirstDue",
DROP COLUMN "experienceContractSecondtDue",
DROP COLUMN "sweatshirtSize",
DROP COLUMN "tshirtSize";

-- DropTable
DROP TABLE "BankAccountInfo";

-- DropTable
DROP TABLE "OccupationExam";
