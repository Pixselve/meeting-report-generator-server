/*
  Warnings:

  - The `peoplePresentDefault` column on the `Report` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Report" DROP COLUMN "peoplePresentDefault",
ADD COLUMN     "peoplePresentDefault" "PeoplePresent"[];
