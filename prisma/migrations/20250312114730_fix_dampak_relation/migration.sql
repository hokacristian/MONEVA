-- CreateTable
CREATE TABLE "Dampak" (
    "id" SERIAL NOT NULL,
    "formInputId" INTEGER NOT NULL,
    "biayaBerobatSebelum" DOUBLE PRECISION NOT NULL,
    "biayaBerobatSesudah" DOUBLE PRECISION NOT NULL,
    "biayaAirBersihSebelum" DOUBLE PRECISION NOT NULL,
    "biayaAirBersihSesudah" DOUBLE PRECISION NOT NULL,
    "peningkatanEkonomiSebelum" DOUBLE PRECISION NOT NULL,
    "peningkatanEkonomiSesudah" DOUBLE PRECISION NOT NULL,
    "penurunanOrangSakitSebelum" INTEGER NOT NULL,
    "penurunanOrangSakitSesudah" INTEGER NOT NULL,
    "penurunanStuntingSebelum" INTEGER NOT NULL,
    "penurunanStuntingSesudah" INTEGER NOT NULL,
    "peningkatanIndeksKesehatanSebelum" DOUBLE PRECISION NOT NULL,
    "peningkatanIndeksKesehatanSesudah" DOUBLE PRECISION NOT NULL,
    "volumeLimbahDikelola" DOUBLE PRECISION NOT NULL,
    "prosesKonservasiAir" BOOLEAN NOT NULL,
    "penurunanIndexPencemaranSebelum" DOUBLE PRECISION NOT NULL,
    "penurunanIndexPencemaranSesudah" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Dampak_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dampak_formInputId_key" ON "Dampak"("formInputId");

-- AddForeignKey
ALTER TABLE "Dampak" ADD CONSTRAINT "Dampak_formInputId_fkey" FOREIGN KEY ("formInputId") REFERENCES "FormInput"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
