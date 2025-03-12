/*
  Warnings:

  - Added the required column `deskripsiAwareness` to the `Outcome` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Outcome" ADD COLUMN     "deskripsiAwareness" TEXT NOT NULL;
