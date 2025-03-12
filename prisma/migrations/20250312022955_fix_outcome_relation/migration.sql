-- CreateTable
CREATE TABLE "Outcome" (
    "id" SERIAL NOT NULL,
    "formInputId" INTEGER NOT NULL,
    "konsumsiAirPerTahun" DOUBLE PRECISION NOT NULL,
    "kualitasAir" TEXT NOT NULL,
    "rataRataTerpaparPenyakitSebelum" INTEGER NOT NULL,
    "rataRataTerpaparPenyakitSesudah" INTEGER NOT NULL,
    "awarenessMasyarakat" TEXT NOT NULL,
    "penilaianSaranaAirBersih" TEXT NOT NULL,
    "penilaianSanitasi" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Outcome_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Outcome_formInputId_key" ON "Outcome"("formInputId");

-- AddForeignKey
ALTER TABLE "Outcome" ADD CONSTRAINT "Outcome_formInputId_fkey" FOREIGN KEY ("formInputId") REFERENCES "FormInput"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
