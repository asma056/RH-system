-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_employeeId_fkey";

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
