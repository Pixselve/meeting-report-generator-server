/*
  Warnings:

  - The values [PARENTS] on the enum `Objective` will be removed. If these variants are still used in the database, this will fail.
  - The values [PARENTS] on the enum `PeoplePresent` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
ALTER TYPE "MeetingBy" ADD VALUE 'TEACHER';

-- AlterEnum
BEGIN;
CREATE TYPE "Objective_new" AS ENUM ('LEARNING', 'JOBS', 'RELATIONSHIPS', 'ADAPTATIONS', 'PROJECTS');
ALTER TABLE "Report" ALTER COLUMN "objectives" TYPE "Objective_new"[] USING ("objectives"::text::"Objective_new"[]);
ALTER TYPE "Objective" RENAME TO "Objective_old";
ALTER TYPE "Objective_new" RENAME TO "Objective";
DROP TYPE "Objective_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PeoplePresent_new" AS ENUM ('FATHER', 'STUDENT', 'MOTHER', 'PRINCIPAL');
ALTER TYPE "PeoplePresent" RENAME TO "PeoplePresent_old";
ALTER TYPE "PeoplePresent_new" RENAME TO "PeoplePresent";
DROP TYPE "PeoplePresent_old";
COMMIT;
