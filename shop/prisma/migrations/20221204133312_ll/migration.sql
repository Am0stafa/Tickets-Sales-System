-- CreateTable
CREATE TABLE "Match" (
    "id" SERIAL NOT NULL,
    "roundNumber" INTEGER,
    "Date" TIMESTAMP(3),
    "location" TEXT,
    "homeTeam" TEXT DEFAULT 'TBD',
    "homeTeamContinents" TEXT,
    "awayTeam" TEXT DEFAULT 'TBD',
    "awayTeamContinents" TEXT,
    "group" TEXT,
    "homeTeamScore" INTEGER,
    "awayTeamScore" INTEGER,
    "rank" INTEGER,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
