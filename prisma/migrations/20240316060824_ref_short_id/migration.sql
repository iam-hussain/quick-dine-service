/*
  Warnings:

  - A unique constraint covering the columns `[shortId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shortId]` on the table `Store` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shortId` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortId` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_businessAccountId_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_personalAccountId_fkey";

-- DropForeignKey
ALTER TABLE "BusinessAccount" DROP CONSTRAINT "BusinessAccount_imageId_fkey";

-- DropForeignKey
ALTER TABLE "BusinessAccountsOnStores" DROP CONSTRAINT "BusinessAccountsOnStores_accountId_fkey";

-- DropForeignKey
ALTER TABLE "BusinessAccountsOnStores" DROP CONSTRAINT "BusinessAccountsOnStores_storeId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_productId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_storeId_fkey";

-- DropForeignKey
ALTER TABLE "PersonalAccount" DROP CONSTRAINT "PersonalAccount_imageId_fkey";

-- DropForeignKey
ALTER TABLE "PersonalAccountsOnStores" DROP CONSTRAINT "PersonalAccountsOnStores_accountId_fkey";

-- DropForeignKey
ALTER TABLE "PersonalAccountsOnStores" DROP CONSTRAINT "PersonalAccountsOnStores_storeId_fkey";

-- DropForeignKey
ALTER TABLE "Store" DROP CONSTRAINT "Store_addressId_fkey";

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "shortId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "shortId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Address_shortId_key" ON "Address"("shortId");

-- CreateIndex
CREATE UNIQUE INDEX "Store_shortId_key" ON "Store"("shortId");

-- AddForeignKey
ALTER TABLE "BusinessAccount" ADD CONSTRAINT "BusinessAccount_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("shortId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessAccountsOnStores" ADD CONSTRAINT "BusinessAccountsOnStores_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "BusinessAccount"("shortId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessAccountsOnStores" ADD CONSTRAINT "BusinessAccountsOnStores_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("shortId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("shortId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalAccountsOnStores" ADD CONSTRAINT "PersonalAccountsOnStores_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "PersonalAccount"("shortId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalAccountsOnStores" ADD CONSTRAINT "PersonalAccountsOnStores_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("shortId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalAccount" ADD CONSTRAINT "PersonalAccount_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("shortId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_personalAccountId_fkey" FOREIGN KEY ("personalAccountId") REFERENCES "PersonalAccount"("shortId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_businessAccountId_fkey" FOREIGN KEY ("businessAccountId") REFERENCES "BusinessAccount"("shortId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("shortId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("shortId") ON DELETE SET NULL ON UPDATE CASCADE;
