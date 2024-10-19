/*
  Warnings:

  - You are about to drop the `Vacation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Vacation" DROP CONSTRAINT "Vacation_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "VacationPeriod" DROP CONSTRAINT "VacationPeriod_vacationId_fkey";

-- DropTable
DROP TABLE "Vacation";

-- CreateTable
CREATE TABLE "VestingPeriod" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "daysOfLaw" DECIMAL(65,30) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),

    CONSTRAINT "VestingPeriod_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VestingPeriod" ADD CONSTRAINT "VestingPeriod_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VacationPeriod" ADD CONSTRAINT "VacationPeriod_vacationId_fkey" FOREIGN KEY ("vacationId") REFERENCES "VestingPeriod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
