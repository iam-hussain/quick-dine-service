/*
  Warnings:

  - You are about to drop the column `accountId` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `createdStoreId` on the `PersonalAccount` table. All the data in the column will be lost.
  - You are about to drop the `Connection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_accountId_fkey";

-- DropForeignKey
ALTER TABLE "Connection" DROP CONSTRAINT "Connection_accountId_fkey";

-- DropForeignKey
ALTER TABLE "Connection" DROP CONSTRAINT "Connection_storeId_fkey";

-- DropForeignKey
ALTER TABLE "PersonalAccount" DROP CONSTRAINT "PersonalAccount_createdStoreId_fkey";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "accountId",
ADD COLUMN     "businessAccountId" INTEGER;

-- AlterTable
ALTER TABLE "PersonalAccount" DROP COLUMN "createdStoreId";

-- DropTable
DROP TABLE "Connection";

-- CreateTable
CREATE TABLE "PersonalAccountsOnStores" (
    "personalAccountId" INTEGER NOT NULL,
    "storeId" INTEGER NOT NULL,
    "originated" BOOLEAN NOT NULL DEFAULT false,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PersonalAccountsOnStores_pkey" PRIMARY KEY ("storeId","personalAccountId")
);

-- CreateTable
CREATE TABLE "BusinessAccountsOnStores" (
    "administer" BOOLEAN NOT NULL DEFAULT false,
    "access" JSONB NOT NULL DEFAULT '{}',
    "businessAccountId" INTEGER NOT NULL,
    "storeId" INTEGER NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessAccountsOnStores_pkey" PRIMARY KEY ("storeId","businessAccountId")
);

-- AddForeignKey
ALTER TABLE "PersonalAccountsOnStores" ADD CONSTRAINT "PersonalAccountsOnStores_personalAccountId_fkey" FOREIGN KEY ("personalAccountId") REFERENCES "PersonalAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalAccountsOnStores" ADD CONSTRAINT "PersonalAccountsOnStores_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessAccountsOnStores" ADD CONSTRAINT "BusinessAccountsOnStores_businessAccountId_fkey" FOREIGN KEY ("businessAccountId") REFERENCES "BusinessAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessAccountsOnStores" ADD CONSTRAINT "BusinessAccountsOnStores_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_businessAccountId_fkey" FOREIGN KEY ("businessAccountId") REFERENCES "BusinessAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;
