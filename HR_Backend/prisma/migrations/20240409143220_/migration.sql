/*
  Warnings:

  - Added the required column `documentDelivery` to the `EquipmentOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `documentReturn` to the `EquipmentOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EquipmentOrder" ADD COLUMN     "documentDelivery" TEXT NOT NULL,
ADD COLUMN     "documentReturn" TEXT NOT NULL;
