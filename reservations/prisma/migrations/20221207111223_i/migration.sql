/*
  Warnings:

  - Changed the type of `expiresIn` on the `Hold` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Hold" DROP COLUMN "expiresIn",
ADD COLUMN     "expiresIn" INTEGER NOT NULL;
