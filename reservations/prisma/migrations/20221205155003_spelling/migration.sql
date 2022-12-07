/*
  Warnings:

  - You are about to drop the column `isPerchased` on the `Ticket` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "isPerchased",
ADD COLUMN     "isPurchased" BOOLEAN NOT NULL DEFAULT false;
