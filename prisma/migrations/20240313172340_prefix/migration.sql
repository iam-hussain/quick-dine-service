/*
  Warnings:

  - You are about to drop the column `prifix` on the `Store` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[prefix]` on the table `Store` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `prefix` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Store_prifix_key";

-- AlterTable
ALTER TABLE "Store" DROP COLUMN "prifix",
ADD COLUMN     "prefix" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Store_prefix_key" ON "Store"("prefix");
