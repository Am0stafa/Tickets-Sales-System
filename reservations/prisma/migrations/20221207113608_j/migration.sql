/*
  Warnings:

  - You are about to drop the `Hold` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_holdId_fkey";

-- DropTable
DROP TABLE "Hold";
