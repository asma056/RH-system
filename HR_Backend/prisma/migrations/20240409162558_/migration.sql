/*
  Warnings:

  - You are about to drop the column `documentDelivery` on the `EquipmentOrder` table. All the data in the column will be lost.
  - You are about to drop the column `documentReturn` on the `EquipmentOrder` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EquipmentOrder" DROP COLUMN "documentDelivery",
DROP COLUMN "documentReturn";
