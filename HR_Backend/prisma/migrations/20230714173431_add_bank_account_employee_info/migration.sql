-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "dateOfBirth" SET DATA TYPE DATE,
ALTER COLUMN "admissionDate" SET DATA TYPE DATE,
ALTER COLUMN "emissionDate" SET DATA TYPE DATE;

-- CreateTable
CREATE TABLE "BankAccountInfo" (
    "id" SERIAL NOT NULL,
    "bankName" TEXT NOT NULL,
    "agencyNumber" TEXT NOT NULL,
    "pix" TEXT,
    "updateAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "employeeId" INTEGER NOT NULL,

    CONSTRAINT "BankAccountInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BankAccountInfo_employeeId_key" ON "BankAccountInfo"("employeeId");

-- AddForeignKey
ALTER TABLE "BankAccountInfo" ADD CONSTRAINT "BankAccountInfo_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
