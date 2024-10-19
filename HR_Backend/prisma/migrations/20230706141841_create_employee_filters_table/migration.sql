-- CreateTable
CREATE TABLE "EmployeeFilters" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "EmployeeFilters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EmployeeFiltersToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EmployeeFiltersToUser_AB_unique" ON "_EmployeeFiltersToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_EmployeeFiltersToUser_B_index" ON "_EmployeeFiltersToUser"("B");

-- AddForeignKey
ALTER TABLE "_EmployeeFiltersToUser" ADD CONSTRAINT "_EmployeeFiltersToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "EmployeeFilters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmployeeFiltersToUser" ADD CONSTRAINT "_EmployeeFiltersToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
