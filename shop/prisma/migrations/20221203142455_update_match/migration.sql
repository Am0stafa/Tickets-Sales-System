/*
  Warnings:

  - You are about to drop the column `name` on the `Match` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Match" DROP COLUMN "name",
ALTER COLUMN "homeTeam" DROP NOT NULL,
ALTER COLUMN "homeTeam" SET DEFAULT 'TBD',
ALTER COLUMN "homeTeamContinents" DROP NOT NULL,
ALTER COLUMN "awayTeam" DROP NOT NULL,
ALTER COLUMN "awayTeam" SET DEFAULT 'TBD',
ALTER COLUMN "awayTeamContinents" DROP NOT NULL;
