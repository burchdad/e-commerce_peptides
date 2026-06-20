-- AlterTable
ALTER TABLE "OrderRequest" ADD COLUMN     "discountCode" TEXT,
ADD COLUMN     "discountAmount" DECIMAL(10,2),
ADD COLUMN     "shippingAmount" DECIMAL(10,2),
ADD COLUMN     "taxAmount" DECIMAL(10,2);
