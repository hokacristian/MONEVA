/*
  Warnings:

  - The `kualitasAir` column on the `Outcome` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Outcome" DROP COLUMN "kualitasAir",
ADD COLUMN     "kualitasAir" BOOLEAN;
