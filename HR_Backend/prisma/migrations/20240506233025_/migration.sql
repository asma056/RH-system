-- CreateTable
CREATE TABLE "Alerts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Alerts_pkey" PRIMARY KEY ("id")
);
