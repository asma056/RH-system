-- DropForeignKey
ALTER TABLE "BankAccountInfo" DROP CONSTRAINT "BankAccountInfo_employeeId_fkey";

-- AddForeignKey
ALTER TABLE "BankAccountInfo" ADD CONSTRAINT "BankAccountInfo_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
