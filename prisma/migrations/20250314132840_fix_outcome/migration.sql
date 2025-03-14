/*
  Warnings:

  - You are about to drop the column `awarenessMasyarakat` on the `Outcome` table. All the data in the column will be lost.
  - You are about to drop the column `deskripsiAwareness` on the `Outcome` table. All the data in the column will be lost.
  - You are about to drop the column `penilaianSanitasi` on the `Outcome` table. All the data in the column will be lost.
  - You are about to drop the column `penilaianSaranaAirBersih` on the `Outcome` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Outcome" DROP COLUMN "awarenessMasyarakat",
DROP COLUMN "deskripsiAwareness",
DROP COLUMN "penilaianSanitasi",
DROP COLUMN "penilaianSaranaAirBersih";
