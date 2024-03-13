/*
  Warnings:

  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductToTag` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[shortcode]` on the table `BusinessAccount` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shortcode]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shortcode]` on the table `Item` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shortcode]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shortcode]` on the table `PersonalAccount` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shortcode]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shortcode]` on the table `Store` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shortcode` to the `BusinessAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortcode` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortcode` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortcode` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortcode` to the `PersonalAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortcode` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortcode` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_imageId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_storeId_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToTag" DROP CONSTRAINT "_ProductToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToTag" DROP CONSTRAINT "_ProductToTag_B_fkey";

-- AlterTable
ALTER TABLE "BusinessAccount" ADD COLUMN     "shortcode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "shortcode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "shortcode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "shortcode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PersonalAccount" ADD COLUMN     "shortcode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "shortcode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "shortcode" TEXT NOT NULL;

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "_ProductToTag";

-- DropEnum
DROP TYPE "PRODUCT_TAG_TYPE";

-- CreateIndex
CREATE UNIQUE INDEX "BusinessAccount_shortcode_key" ON "BusinessAccount"("shortcode");

-- CreateIndex
CREATE UNIQUE INDEX "Category_shortcode_key" ON "Category"("shortcode");

-- CreateIndex
CREATE UNIQUE INDEX "Item_shortcode_key" ON "Item"("shortcode");

-- CreateIndex
CREATE UNIQUE INDEX "Order_shortcode_key" ON "Order"("shortcode");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalAccount_shortcode_key" ON "PersonalAccount"("shortcode");

-- CreateIndex
CREATE UNIQUE INDEX "Product_shortcode_key" ON "Product"("shortcode");

-- CreateIndex
CREATE UNIQUE INDEX "Store_shortcode_key" ON "Store"("shortcode");
