/*
  Warnings:

  - Made the column `email` on table `Customer` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_customerId_fkey";

-- DropIndex
DROP INDEX "Ticket_barcode_key";

-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "phone" SET DATA TYPE TEXT,
ALTER COLUMN "email" SET NOT NULL;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "customerId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "holdId" TEXT,
ADD COLUMN     "isHold" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPurchased" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Hold" (
    "id" TEXT NOT NULL,
    "expiresIn" TIMESTAMP(3),
    "kafkaMessage" TEXT DEFAULT '',

    CONSTRAINT "Hold_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Hold_id_key" ON "Hold"("id");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_holdId_fkey" FOREIGN KEY ("holdId") REFERENCES "Hold"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
