-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "storeId" INTEGER;

-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "expireAt" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;
