-- CreateEnum
CREATE TYPE "EmployeeRole" AS ENUM ('Admin', 'Supervisor', 'User');

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "EmployeeRole" NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);
