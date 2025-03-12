-- CreateTable
CREATE TABLE "FormInput" (
    "id" SERIAL NOT NULL,
    "lokasi" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "long" DOUBLE PRECISION NOT NULL,
    "img" TEXT,
    "jmlhBantuan" INTEGER NOT NULL,
    "jenisBantuan" TEXT NOT NULL,
    "jmlhKK" INTEGER NOT NULL,
    "jmlhMasyarakat" INTEGER NOT NULL,
    "jmlhPerempuan" INTEGER NOT NULL,
    "jmlhLaki" INTEGER NOT NULL,
    "debitAir" TEXT NOT NULL,
    "pemakaianAir" TEXT NOT NULL,
    "sanitasi" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FormInput_pkey" PRIMARY KEY ("id")
);
