/*
  Warnings:

  - Added the required column `biayaListrikSebelum` to the `Dampak` table without a default value. This is not possible if the table is not empty.
  - Added the required column `biayaListrikSesudah` to the `Dampak` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sumberAirSebelum` to the `Dampak` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sumberAirSesudah` to the `Dampak` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hargaAir` to the `FormInput` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sumberAir` to the `FormInput` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `FormInput` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bisaDiminum` to the `Outcome` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bisaDipakaiMCK` to the `Outcome` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ecoKeberlanjutan` to the `Outcome` table without a default value. This is not possible if the table is not empty.
  - Added the required column `levelSaranaAirBersih` to the `Outcome` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dampak" ADD COLUMN     "biayaListrikSebelum" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "biayaListrikSesudah" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sumberAirSebelum" TEXT NOT NULL,
ADD COLUMN     "sumberAirSesudah" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "FormInput" ADD COLUMN     "hargaAir" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sumberAir" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Outcome" ADD COLUMN     "bisaDiminum" BOOLEAN NOT NULL,
ADD COLUMN     "bisaDipakaiMCK" BOOLEAN NOT NULL,
ADD COLUMN     "ecoKeberlanjutan" BOOLEAN NOT NULL,
ADD COLUMN     "levelSaranaAirBersih" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "FormInput" ADD CONSTRAINT "FormInput_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
