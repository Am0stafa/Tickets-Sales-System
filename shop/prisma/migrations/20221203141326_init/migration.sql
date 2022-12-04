-- CreateTable
CREATE TABLE "Match" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'TBD',
    "roundNumber" INTEGER NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "homeTeam" TEXT NOT NULL,
    "homeTeamContinents" TEXT NOT NULL,
    "awayTeam" TEXT NOT NULL,
    "awayTeamContinents" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "homeTeamScore" INTEGER,
    "awayTeamScore" INTEGER,
    "rank" INTEGER NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "pdfDescription" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "barcode" TEXT,
    "gateOpens" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "external" BOOLEAN NOT NULL,
    "column" INTEGER NOT NULL,
    "matchId" INTEGER NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "orderDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "requiredDate" TIMESTAMP(3),
    "shipedDate" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'shipping',
    "comments" TEXT,
    "price" INTEGER,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "ticketsId" TEXT NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_ticketsId_fkey" FOREIGN KEY ("ticketsId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
