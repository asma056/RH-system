/*
  Warnings:

  - You are about to drop the column `amount` on the `EquipmentOrder` table. All the data in the column will be lost.
  - You are about to drop the column `identificationNumber` on the `EquipmentOrder` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EquipmentOrder" DROP COLUMN "amount",
DROP COLUMN "identificationNumber";
