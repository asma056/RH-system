/*
  Warnings:

  - You are about to drop the column `documents` on the `EquipmentOrder` table. All the data in the column will be lost.
  - Added the required column `description` to the `Events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EquipmentOrder" DROP COLUMN "documents";

-- AlterTable
ALTER TABLE "Events" ADD COLUMN     "description" TEXT NOT NULL;
