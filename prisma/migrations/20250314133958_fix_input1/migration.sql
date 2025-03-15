/*
  Warnings:

  - You are about to alter the column `hargaAir` on the `FormInput` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "FormInput" ALTER COLUMN "hargaAir" SET DATA TYPE INTEGER;
