/*
  Warnings:

  - A unique constraint covering the columns `[fullName]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fullName]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Student_fullName_key" ON "Student"("fullName");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_fullName_key" ON "Teacher"("fullName");

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_teacherFullName_fkey" FOREIGN KEY ("teacherFullName") REFERENCES "Teacher"("fullName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_studentFullName_fkey" FOREIGN KEY ("studentFullName") REFERENCES "Student"("fullName") ON DELETE RESTRICT ON UPDATE CASCADE;
