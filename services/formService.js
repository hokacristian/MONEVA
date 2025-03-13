const prisma = require("../configs/prisma");
const { uploadImageToImageKit } = require("../configs/imagekit");

// Di file service
const tambahFormInputService = async (data, imgUrl, userId) => {
  const jmlhMasyarakat = parseInt(data.jmlhPerempuan) + parseInt(data.jmlhLaki);

  const newFormInput = await prisma.formInput.create({
    data: {
      lokasi: data.lokasi,
      lat: parseFloat(data.lat),
      long: parseFloat(data.long),
      img: imgUrl || null, // Handle jika imgUrl undefined
      jmlhBantuan: parseInt(data.jmlhBantuan),
      jenisBantuan: data.jenisBantuan,
      jmlhKK: parseInt(data.jmlhKK),
      jmlhPerempuan: parseInt(data.jmlhPerempuan),
      jmlhLaki: parseInt(data.jmlhLaki),
      jmlhMasyarakat,
      debitAir: data.debitAir,
      pemakaianAir: data.pemakaianAir,
      sanitasi: data.sanitasi,
      sumberAir: data.sumberAir,
      hargaAir: parseFloat(data.hargaAir),
      userId,
    },
  });
  return newFormInput;
};

const tambahOutcomeService = async (formInputId, data) => {
  const {
    konsumsiAirPerTahun,
    kualitasAir,
    rataRataTerpaparPenyakitSebelum,
    rataRataTerpaparPenyakitSesudah,
    awarenessMasyarakat,
    deskripsiAwareness,
    penilaianSaranaAirBersih,
    penilaianSanitasi,
    bisaDipakaiMCK,         // Baru
    bisaDiminum,            // Baru
    ecoKeberlanjutan,       // Baru
  } = data;

  let levelSaranaAirBersih = 0;
  if (bisaDipakaiMCK) levelSaranaAirBersih = 1;
  if (bisaDiminum) levelSaranaAirBersih = 2;
  if (ecoKeberlanjutan) levelSaranaAirBersih = 3;


  const formInput = await prisma.formInput.findUnique({
    where: { id: formInputId },
  });
  if (!formInput) {
    throw new Error("Form input tidak ditemukan");
  }

  const newOutcome = await prisma.outcome.create({
    data: {
      formInputId,
      konsumsiAirPerTahun: parseFloat(konsumsiAirPerTahun),
      kualitasAir,
      rataRataTerpaparPenyakitSebelum: parseInt(rataRataTerpaparPenyakitSebelum),
      rataRataTerpaparPenyakitSesudah: parseInt(rataRataTerpaparPenyakitSesudah),
      awarenessMasyarakat,
      deskripsiAwareness,
      penilaianSaranaAirBersih,
      penilaianSanitasi,
      bisaDipakaiMCK,
      bisaDiminum,
      ecoKeberlanjutan,
      levelSaranaAirBersih,
    },
  });

  return newOutcome;
};

const tambahDampakService = async (formInputId, data) => {
  const {
    biayaBerobatSebelum,
    biayaBerobatSesudah,
    biayaAirBersihSebelum,
    biayaAirBersihSesudah,
    peningkatanEkonomiSebelum,
    peningkatanEkonomiSesudah,
    penurunanOrangSakitSebelum,
    penurunanOrangSakitSesudah,
    penurunanStuntingSebelum,
    penurunanStuntingSesudah,
    peningkatanIndeksKesehatanSebelum,
    peningkatanIndeksKesehatanSesudah,
    volumeLimbahDikelola,
    prosesKonservasiAir,
    penurunanIndexPencemaranSebelum,
    penurunanIndexPencemaranSesudah,
    sumberAirSebelum,
    sumberAirSesudah,
    biayaListrikSebelum,
    biayaListrikSesudah,
  } = data;

  // Validasi apakah formInputId ada
  const formInput = await prisma.formInput.findUnique({
    where: { id: formInputId },
  });
  if (!formInput) {
    throw new Error("Form input tidak ditemukan");
  }

  // Simpan ke database
  const newDampak = await prisma.dampak.create({
    data: {
      formInputId,
      biayaBerobatSebelum: parseFloat(biayaBerobatSebelum),
      biayaBerobatSesudah: parseFloat(biayaBerobatSesudah),
      biayaAirBersihSebelum: parseFloat(biayaAirBersihSebelum),
      biayaAirBersihSesudah: parseFloat(biayaAirBersihSesudah),
      peningkatanEkonomiSebelum: parseFloat(peningkatanEkonomiSebelum),
      peningkatanEkonomiSesudah: parseFloat(peningkatanEkonomiSesudah),
      penurunanOrangSakitSebelum: parseInt(penurunanOrangSakitSebelum),
      penurunanOrangSakitSesudah: parseInt(penurunanOrangSakitSesudah),
      penurunanStuntingSebelum: parseInt(penurunanStuntingSebelum),
      penurunanStuntingSesudah: parseInt(penurunanStuntingSesudah),
      peningkatanIndeksKesehatanSebelum: parseFloat(peningkatanIndeksKesehatanSebelum),
      peningkatanIndeksKesehatanSesudah: parseFloat(peningkatanIndeksKesehatanSesudah),
      volumeLimbahDikelola: parseFloat(volumeLimbahDikelola),
      prosesKonservasiAir: Boolean(prosesKonservasiAir),
      penurunanIndexPencemaranSebelum: parseFloat(penurunanIndexPencemaranSebelum),
      penurunanIndexPencemaranSesudah: parseFloat(penurunanIndexPencemaranSesudah),
      sumberAirSebelum,
      sumberAirSesudah,
      biayaListrikSebelum: parseFloat(biayaListrikSebelum),
      biayaListrikSesudah: parseFloat(biayaListrikSesudah),
    },
  });

  return newDampak;
};

// GET All Form Inputs
const getAllFormInputsService = async () => {
  return await prisma.formInput.findMany({
    include: {
      outcome: true,
      dampak: true,
      user: {
        // Menyertakan relasi user
        select: { name: true }, // Hanya mengambil field 'name' dari User
      },
    },
  });
};

// GET Single Form Input
const getFormInputByIdService = async (id) => {
  return await prisma.formInput.findUnique({
    where: { id },
    include: {
      outcome: true,
      dampak: true,
      user: {
        // Menyertakan relasi user
        select: { name: true }, // Hanya mengambil field 'name' dari User
      },
    },
  });
};

const updateFormInputService = async (id, data, file) => {
  let updatedData = { ...data };

  // ✅ Konversi hargaAir ke float jika ada
  if (updatedData.hargaAir) {
    updatedData.hargaAir = parseFloat(updatedData.hargaAir);
    if (isNaN(updatedData.hargaAir)) {
      throw new Error("hargaAir harus berupa angka valid");
    }
  }

  // ✅ Jika ada file, upload ke ImageKit
  if (file) {
    const uploadImage = await uploadImageToImageKit(file);
    updatedData.img = uploadImage;
  }

  // ✅ Konversi angka lain ke format yang benar
  if (updatedData.jmlhBantuan) updatedData.jmlhBantuan = parseInt(updatedData.jmlhBantuan);
  if (updatedData.jmlhKK) updatedData.jmlhKK = parseInt(updatedData.jmlhKK);
  if (updatedData.jmlhPerempuan) updatedData.jmlhPerempuan = parseInt(updatedData.jmlhPerempuan);
  if (updatedData.jmlhLaki) updatedData.jmlhLaki = parseInt(updatedData.jmlhLaki);
  if (updatedData.lat) updatedData.lat = parseFloat(updatedData.lat);
  if (updatedData.long) updatedData.long = parseFloat(updatedData.long);

  // ✅ Hitung ulang jumlah masyarakat
  if (updatedData.jmlhPerempuan !== undefined && updatedData.jmlhLaki !== undefined) {
    updatedData.jmlhMasyarakat = updatedData.jmlhPerempuan + updatedData.jmlhLaki;
  }

  try {
    const updatedFormInput = await prisma.formInput.update({
      where: { id: parseInt(id) },
      data: updatedData,
    });

    console.log("✅ Form input berhasil diperbarui:", updatedFormInput);
    return updatedFormInput;
  } catch (error) {
    console.error("❌ Gagal memperbarui ke database:", error.message);
    throw new Error("Gagal memperbarui data: " + error.message);
  }
};


// GET All Outcomes
const getAllOutcomesService = async () => {
  return await prisma.outcome.findMany({
    include: { formInput: true },
  });
};

// GET Single Outcome
const getOutcomeByIdService = async (id) => {
  return await prisma.outcome.findUnique({
    where: { id },
    include: { formInput: true },
  });
};

// PATCH (Update) Outcome
const updateOutcomeService = async (id, data) => {
  return await prisma.outcome.update({
    where: { id },
    data,
  });
};

// GET All Dampak
const getAllDampakService = async () => {
  return await prisma.dampak.findMany({
    include: { formInput: true },
  });
};

// GET Single Dampak
const getDampakByIdService = async (id) => {
  return await prisma.dampak.findUnique({
    where: { id },
    include: { formInput: true },
  });
};

// PATCH (Update) Dampak
const updateDampakService = async (id, data) => {
  return await prisma.dampak.update({
    where: { id },
    data,
  });
};

module.exports = {
  tambahFormInputService,
  getAllFormInputsService,
  getAllDampakService,
  getDampakByIdService,
  updateDampakService,
  tambahOutcomeService,
  tambahDampakService,
  getFormInputByIdService,
  updateFormInputService,
  updateOutcomeService,
  getOutcomeByIdService,
  getAllOutcomesService,
};
