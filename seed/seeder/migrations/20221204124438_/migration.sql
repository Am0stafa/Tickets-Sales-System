/*
  Warnings:

  - You are about to drop the column `column` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `pdfDescription` on the `Ticket` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[barcode]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "lastName" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "country" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "column",
DROP COLUMN "pdfDescription";

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_barcode_key" ON "Ticket"("barcode");
