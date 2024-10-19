-- CreateTable
CREATE TABLE "OccupationExam" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "nextExamDate" DATE NOT NULL,
    "lastExamDate" DATE,
    "eSocial" TEXT,
    "employeeId" INTEGER NOT NULL,

    CONSTRAINT "OccupationExam_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OccupationExam_employeeId_key" ON "OccupationExam"("employeeId");

-- AddForeignKey
ALTER TABLE "OccupationExam" ADD CONSTRAINT "OccupationExam_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
