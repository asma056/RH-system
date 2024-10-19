/*
  Warnings:

  - Added the required column `daysOf` to the `VacationPeriod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `VacationPeriod` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VacationPeriod" ADD COLUMN     "daysOf" INTEGER NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;
