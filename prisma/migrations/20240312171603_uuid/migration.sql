/*
  Warnings:

  - You are about to drop the column `shortcode` on the `BusinessAccount` table. All the data in the column will be lost.
  - You are about to drop the column `shortcode` on the `PersonalAccount` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uuid]` on the table `BusinessAccount` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `PersonalAccount` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `Store` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uuid` to the `BusinessAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uuid` to the `PersonalAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uuid` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "BusinessAccount_shortcode_key";

-- DropIndex
DROP INDEX "PersonalAccount_shortcode_key";

-- AlterTable
ALTER TABLE "BusinessAccount" DROP COLUMN "shortcode",
ADD COLUMN     "uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PersonalAccount" DROP COLUMN "shortcode",
ADD COLUMN     "uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "uuid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BusinessAccount_uuid_key" ON "BusinessAccount"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalAccount_uuid_key" ON "PersonalAccount"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Store_uuid_key" ON "Store"("uuid");
