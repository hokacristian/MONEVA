/*
  Warnings:

  - Changed the type of `debitAir` on the `FormInput` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "FormInput" DROP COLUMN "debitAir",
ADD COLUMN     "debitAir" INTEGER NOT NULL;
