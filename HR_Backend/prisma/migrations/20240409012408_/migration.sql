-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "EquipmentOrder" DROP CONSTRAINT "EquipmentOrder_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "OccupationExam" DROP CONSTRAINT "OccupationExam_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "VacationPeriod" DROP CONSTRAINT "VacationPeriod_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "VestingPeriod" DROP CONSTRAINT "VestingPeriod_employeeId_fkey";

-- AddForeignKey
ALTER TABLE "VestingPeriod" ADD CONSTRAINT "VestingPeriod_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VacationPeriod" ADD CONSTRAINT "VacationPeriod_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentOrder" ADD CONSTRAINT "EquipmentOrder_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OccupationExam" ADD CONSTRAINT "OccupationExam_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
