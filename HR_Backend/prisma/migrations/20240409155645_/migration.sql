/*
  Warnings:

  - Added the required column `DocumentDelivery` to the `EquipmentOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DocumentReturn` to the `EquipmentOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EquipmentOrder" ADD COLUMN     "DocumentDelivery" TEXT NOT NULL,
ADD COLUMN     "DocumentReturn" TEXT NOT NULL;
