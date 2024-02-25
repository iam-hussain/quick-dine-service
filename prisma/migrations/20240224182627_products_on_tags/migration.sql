/*
  Warnings:

  - You are about to drop the column `accountId` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the `ProductTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductToProductTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductTag" DROP CONSTRAINT "ProductTag_imageId_fkey";

-- DropForeignKey
ALTER TABLE "ProductTag" DROP CONSTRAINT "ProductTag_storeId_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToProductTag" DROP CONSTRAINT "_ProductToProductTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToProductTag" DROP CONSTRAINT "_ProductToProductTag_B_fkey";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "accountId";

-- DropTable
DROP TABLE "ProductTag";

-- DropTable
DROP TABLE "_ProductToProductTag";

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "deck" TEXT,
    "position" INTEGER NOT NULL DEFAULT 0,
    "type" "PRODUCT_TAG_TYPE" NOT NULL DEFAULT 'DEFAULT',
    "imageId" INTEGER,
    "storeId" INTEGER NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductsOnTags" (
    "tagId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "assigned" BOOLEAN NOT NULL DEFAULT true,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductsOnTags_pkey" PRIMARY KEY ("tagId","productId")
);

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsOnTags" ADD CONSTRAINT "ProductsOnTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsOnTags" ADD CONSTRAINT "ProductsOnTags_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
