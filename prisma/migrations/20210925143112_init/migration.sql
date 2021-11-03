-- CreateEnum
CREATE TYPE "MeetingBy" AS ENUM ('PARENTS');

-- CreateEnum
CREATE TYPE "Objective" AS ENUM ('PARENTS');

-- CreateEnum
CREATE TYPE "PeoplePresent" AS ENUM ('PARENTS');

-- CreateEnum
CREATE TYPE "Grade" AS ENUM ('CP', 'CE1', 'CE2', 'CM1', 'CM2');

-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "teacherFullName" TEXT NOT NULL,
    "studentFullName" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "importantInformation" TEXT NOT NULL,
    "grade" "Grade" NOT NULL,
    "meetingByDefault" "MeetingBy"[],
    "meetingByCustom" TEXT[],
    "peoplePresentDefault" "MeetingBy"[],
    "peoplePresentCustom" TEXT[],
    "objectives" "Objective"[],

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
