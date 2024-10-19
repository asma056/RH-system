/*
  Warnings:

  - A unique constraint covering the columns `[employeeId]` on the table `Vacation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Vacation_employeeId_key" ON "Vacation"("employeeId");
