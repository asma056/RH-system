/*
  Warnings:

  - You are about to drop the column `orderId` on the `Equipment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[equipmentId]` on the table `EquipmentOrder` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `equipmentId` to the `EquipmentOrder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Equipment" DROP CONSTRAINT "Equipment_orderId_fkey";

-- AlterTable
ALTER TABLE "Equipment" DROP COLUMN "orderId";

-- AlterTable
ALTER TABLE "EquipmentOrder" ADD COLUMN     "equipmentId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "EquipmentOrder_equipmentId_key" ON "EquipmentOrder"("equipmentId");

-- AddForeignKey
ALTER TABLE "EquipmentOrder" ADD CONSTRAINT "EquipmentOrder_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
