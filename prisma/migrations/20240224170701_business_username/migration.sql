/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `BusinessAccount` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `PersonalAccount` will be added. If there are existing duplicate values, this will fail.
  - The required column `username` was added to the `BusinessAccount` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "BusinessAccount" ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BusinessAccount_username_key" ON "BusinessAccount"("username");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalAccount_username_key" ON "PersonalAccount"("username");
