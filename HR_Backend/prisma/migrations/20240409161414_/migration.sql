/*
  Warnings:

  - You are about to drop the column `DocumentDelivery` on the `EquipmentOrder` table. All the data in the column will be lost.
  - You are about to drop the column `DocumentReturn` on the `EquipmentOrder` table. All the data in the column will be lost.
  - Added the required column `documentDelivery` to the `EquipmentOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EquipmentOrder" DROP COLUMN "DocumentDelivery",
DROP COLUMN "DocumentReturn",
ADD COLUMN     "documentDelivery" TEXT NOT NULL,
ADD COLUMN     "documentReturn" TEXT;
