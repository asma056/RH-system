/*
  Warnings:

  - Added the required column `document` to the `EquipmentOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EquipmentOrder" ADD COLUMN     "document" TEXT NOT NULL;
