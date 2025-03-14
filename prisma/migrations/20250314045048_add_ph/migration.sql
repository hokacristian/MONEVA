/*
  Warnings:

  - You are about to drop the column `sanitasi` on the `FormInput` table. All the data in the column will be lost.
  - Added the required column `sistemPengelolaan` to the `FormInput` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FormInput" DROP COLUMN "sanitasi",
ADD COLUMN     "EC" DOUBLE PRECISION,
ADD COLUMN     "ORP" DOUBLE PRECISION,
ADD COLUMN     "TDS" DOUBLE PRECISION,
ADD COLUMN     "pH" DOUBLE PRECISION,
ADD COLUMN     "sistemPengelolaan" TEXT NOT NULL;
