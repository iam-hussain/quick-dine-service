/*
  Warnings:

  - The primary key for the `BusinessAccountsOnStores` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `businessAccountId` on the `BusinessAccountsOnStores` table. All the data in the column will be lost.
  - The primary key for the `PersonalAccountsOnStores` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `personalAccountId` on the `PersonalAccountsOnStores` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Tag` table. All the data in the column will be lost.
  - Added the required column `accountId` to the `BusinessAccountsOnStores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountId` to the `PersonalAccountsOnStores` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BusinessAccountsOnStores" DROP CONSTRAINT "BusinessAccountsOnStores_businessAccountId_fkey";

-- DropForeignKey
ALTER TABLE "PersonalAccountsOnStores" DROP CONSTRAINT "PersonalAccountsOnStores_personalAccountId_fkey";

-- AlterTable
ALTER TABLE "BusinessAccountsOnStores" DROP CONSTRAINT "BusinessAccountsOnStores_pkey",
DROP COLUMN "businessAccountId",
ADD COLUMN     "accountId" INTEGER NOT NULL,
ADD COLUMN     "assigned" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "BusinessAccountsOnStores_pkey" PRIMARY KEY ("storeId", "accountId");

-- AlterTable
ALTER TABLE "PersonalAccountsOnStores" DROP CONSTRAINT "PersonalAccountsOnStores_pkey",
DROP COLUMN "personalAccountId",
ADD COLUMN     "accountId" INTEGER NOT NULL,
ADD COLUMN     "assigned" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "PersonalAccountsOnStores_pkey" PRIMARY KEY ("storeId", "accountId");

-- AlterTable
ALTER TABLE "ProductsOnTags" ADD COLUMN     "type" "PRODUCT_TAG_TYPE" NOT NULL DEFAULT 'DEFAULT';

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "type";

-- DropEnum
DROP TYPE "ACCOUNT_TYPE";

-- AddForeignKey
ALTER TABLE "BusinessAccountsOnStores" ADD CONSTRAINT "BusinessAccountsOnStores_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "BusinessAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalAccountsOnStores" ADD CONSTRAINT "PersonalAccountsOnStores_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "PersonalAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
