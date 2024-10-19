/*
  Warnings:

  - You are about to drop the `EmployeeFilters` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EmployeeFiltersToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_EmployeeFiltersToUser" DROP CONSTRAINT "_EmployeeFiltersToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_EmployeeFiltersToUser" DROP CONSTRAINT "_EmployeeFiltersToUser_B_fkey";

-- DropTable
DROP TABLE "EmployeeFilters";

-- DropTable
DROP TABLE "_EmployeeFiltersToUser";
