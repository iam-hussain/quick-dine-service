/*
  Warnings:

  - You are about to drop the column `assigned` on the `ProductsOnTags` table. All the data in the column will be lost.
  - You are about to drop the column `assignedAt` on the `ProductsOnTags` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `ProductsOnTags` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProductsOnTags" DROP COLUMN "assigned",
DROP COLUMN "assignedAt",
DROP COLUMN "type";

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "type" "PRODUCT_TAG_TYPE" NOT NULL DEFAULT 'DEFAULT';
