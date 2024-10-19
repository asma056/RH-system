/*
  Warnings:

  - Added the required column `jobFormat` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "jobFormat" TEXT NOT NULL;
