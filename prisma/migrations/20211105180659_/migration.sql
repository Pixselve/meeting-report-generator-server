-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_studentFullName_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_teacherFullName_fkey";

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_teacherFullName_fkey" FOREIGN KEY ("teacherFullName") REFERENCES "Teacher"("fullName") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_studentFullName_fkey" FOREIGN KEY ("studentFullName") REFERENCES "Student"("fullName") ON DELETE CASCADE ON UPDATE CASCADE;
