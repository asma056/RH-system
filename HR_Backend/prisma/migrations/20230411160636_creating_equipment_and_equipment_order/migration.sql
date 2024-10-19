-- CreateTable
CREATE TABLE "Equipment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquipmentOrder" (
    "id" SERIAL NOT NULL,
    "deliveryDate" TIMESTAMP(3) NOT NULL,
    "returnDate" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "observation" TEXT NOT NULL,
    "identificationNumber" TEXT NOT NULL,

    CONSTRAINT "EquipmentOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Equipment_orderId_key" ON "Equipment"("orderId");

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "EquipmentOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
