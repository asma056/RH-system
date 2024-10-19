/*
  Warnings:

  - You are about to drop the column `name` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `rh` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Employee` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[employeeId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cep` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `number` on the `Address` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `emissionAgency` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emissionDate` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mothersName` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pisNumber` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rg` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uf` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "cep" TEXT NOT NULL,
DROP COLUMN "number",
ADD COLUMN     "number" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "name",
DROP COLUMN "rh",
DROP COLUMN "title",
ADD COLUMN     "emissionAgency" TEXT NOT NULL,
ADD COLUMN     "emissionDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "level" TEXT,
ADD COLUMN     "mothersName" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "pisNumber" TEXT NOT NULL,
ADD COLUMN     "position" TEXT,
ADD COLUMN     "rg" TEXT NOT NULL,
ADD COLUMN     "uf" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Address_employeeId_key" ON "Address"("employeeId");
