/*
  Warnings:

  - Added the required column `adaSeptictank` to the `Outcome` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adaptabilitasSistem` to the `Outcome` table without a default value. This is not possible if the table is not empty.
  - Added the required column `airHanyaUntukMCK` to the `Outcome` table without a default value. This is not possible if the table is not empty.
  - Added the required column `airTersediaSetiapSaat` to the `Outcome` table without a default value. This is not possible if the table is not empty.
  - Added the required column `aksesKelompokRentan` to the `Outcome` table without a default value. This is not possible if the table is not empty.
  - Added the required column `aksesMudah` to the `Outcome` table without a default value. This is not possible if the table is not empty.
  - Added the required column `aksesSanitasiMemadai` to the `Outcome` table without a default value. This is not possible if the table is not empty.
  - Added the required column `aksesTerbatas` to the `Outcome` table without a default value. This is not possible if the table is not empty.
  - Added the required column `butuhUsahaJarak` to the `Outcome` table without a default value. This is not possible if the table is not empty.
  - Added the required column `efisiensiAir` to the `Outcome` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eksposurLimbah` to the `Outcome` table without a default value. This is not possible if the table is not empty.
  - Added the required column `keadilanAkses` to the `Outcome` table without a default value. This is not possible if the table is not empty.
  - Added the required column `keberlanjutanEkosistem` to the `Outcome` table without a default value. This is not possible if the table is not empty.
  - Added the required column `levelSanitasi` to the `Outcome` table without a default value. This is not possible if the table is not empty.
  - Added the required column `limbahDikelolaAman` to the `Outcome` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pemanfaatanAirEfisien` to the `Outcome` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pengelolaanProfesional` to the `Outcome` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ramahLingkungan` to the `Outcome` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rasioMCKMemadai` to the `Outcome` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sanitasiBersih` to the `Outcome` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toiletBerfungsi` to the `Outcome` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Outcome" ADD COLUMN     "adaSeptictank" BOOLEAN NOT NULL,
ADD COLUMN     "adaptabilitasSistem" BOOLEAN NOT NULL,
ADD COLUMN     "airHanyaUntukMCK" BOOLEAN NOT NULL,
ADD COLUMN     "airTersediaSetiapSaat" BOOLEAN NOT NULL,
ADD COLUMN     "aksesKelompokRentan" BOOLEAN NOT NULL,
ADD COLUMN     "aksesMudah" BOOLEAN NOT NULL,
ADD COLUMN     "aksesSanitasiMemadai" BOOLEAN NOT NULL,
ADD COLUMN     "aksesTerbatas" BOOLEAN NOT NULL,
ADD COLUMN     "butuhUsahaJarak" BOOLEAN NOT NULL,
ADD COLUMN     "efisiensiAir" BOOLEAN NOT NULL,
ADD COLUMN     "eksposurLimbah" BOOLEAN NOT NULL,
ADD COLUMN     "keadilanAkses" BOOLEAN NOT NULL,
ADD COLUMN     "keberlanjutanEkosistem" BOOLEAN NOT NULL,
ADD COLUMN     "levelSanitasi" INTEGER NOT NULL,
ADD COLUMN     "limbahDikelolaAman" BOOLEAN NOT NULL,
ADD COLUMN     "pemanfaatanAirEfisien" BOOLEAN NOT NULL,
ADD COLUMN     "pengelolaanProfesional" BOOLEAN NOT NULL,
ADD COLUMN     "ramahLingkungan" BOOLEAN NOT NULL,
ADD COLUMN     "rasioMCKMemadai" BOOLEAN NOT NULL,
ADD COLUMN     "sanitasiBersih" BOOLEAN NOT NULL,
ADD COLUMN     "toiletBerfungsi" BOOLEAN NOT NULL;
