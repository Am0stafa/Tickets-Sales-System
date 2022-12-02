/*
  Warnings:

  - You are about to drop the `Widget` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Widget";

-- CreateTable
CREATE TABLE "Match" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL DEFAULT 'TBD',
    "roundNumber" INT4 NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,
    "location" STRING NOT NULL,
    "homeTeam" STRING NOT NULL,
    "homeTeamContinents" STRING NOT NULL,
    "awayTeam" STRING NOT NULL,
    "awayTeamContinents" STRING NOT NULL,
    "group" STRING NOT NULL,
    "homeTeamScore" INT4,
    "awayTeamScore" INT4,
    "rank" INT4 NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" STRING NOT NULL,
    "firstName" STRING NOT NULL,
    "lastName" STRING NOT NULL,
    "phone" INT4 NOT NULL,
    "country" STRING NOT NULL,
    "email" STRING NOT NULL,
    "password" STRING,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" STRING NOT NULL,
    "pdfDescription" STRING NOT NULL,
    "price" INT4 NOT NULL,
    "barcode" STRING,
    "gateOpens" STRING NOT NULL,
    "category" STRING NOT NULL,
    "external" BOOL NOT NULL,
    "column" INT4 NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" STRING NOT NULL,
    "orderDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "requiredDate" TIMESTAMP(3),
    "shipedDate" TIMESTAMP(3),
    "status" STRING NOT NULL DEFAULT 'shipping',
    "comments" STRING,
    "price" INT4,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" STRING NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);
