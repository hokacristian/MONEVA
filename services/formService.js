const prisma = require("../configs/prisma");
const { uploadImageToImageKit } = require("../configs/imagekit");

const tambahFormInputService = async (data, imgUrl, userId) => {
  const jmlhMasyarakat = parseInt(data.jmlhPerempuan) + parseInt(data.jmlhLaki);

  const newFormInput = await prisma.formInput.create({
    data: {
      lokasi: data.lokasi,
      lat: parseFloat(data.lat),
      long: parseFloat(data.long),
      img: imgUrl || null, // Jika tidak ada gambar
      jmlhBantuan: parseInt(data.jmlhBantuan),
      jenisBantuan: data.jenisBantuan,
      jmlhKK: parseInt(data.jmlhKK),
      jmlhPerempuan: parseInt(data.jmlhPerempuan),
      jmlhLaki: parseInt(data.jmlhLaki),
      jmlhMasyarakat,
      debitAir: data.debitAir,
      pemakaianAir: data.pemakaianAir,
      sistemPengelolaan: data.sistemPengelolaan, // 🔥 Ganti sanitasi menjadi sistemPengelolaan
      sumberAir: data.sumberAir,
      hargaAir: parseFloat(data.hargaAir),

      // 🔥 Tambahan parameter kualitas air
      pH: data.pH ? parseFloat(data.pH) : null,
      TDS: data.TDS ? parseFloat(data.TDS) : null,
      EC: data.EC ? parseFloat(data.EC) : null,
      ORP: data.ORP ? parseFloat(data.ORP) : null,

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
    bisaDipakaiMCK = null, 
    bisaDiminum = null,
    ecoKeberlanjutan = null,

    // Data tambahan untuk perhitungan level
    airHanyaUntukMCK = null,
    aksesTerbatas = null,
    butuhUsahaJarak = null,
    airTersediaSetiapSaat = null,
    pengelolaanProfesional = null,
    aksesMudah = null,
    efisiensiAir = null,
    ramahLingkungan = null,
    keadilanAkses = null,
    adaptabilitasSistem = null,

    toiletBerfungsi = null,
    aksesSanitasiMemadai = null,
    eksposurLimbah = null,
    limbahDikelolaAman = null,
    adaSeptictank = null,
    sanitasiBersih = null,
    aksesKelompokRentan = null,
    rasioMCKMemadai = null,
    keberlanjutanEkosistem = null,
    pemanfaatanAirEfisien = null
  } = data;

  // Cek apakah semua nilai terkait `levelSaranaAirBersih` adalah null
  const isSaranaAirBersihNull = [
    airHanyaUntukMCK, aksesTerbatas, butuhUsahaJarak,
    airTersediaSetiapSaat, bisaDiminum, pengelolaanProfesional,
    aksesMudah, efisiensiAir, ramahLingkungan,
    keadilanAkses, adaptabilitasSistem
  ].every(value => value === null || value === undefined);

  // Cek apakah semua nilai terkait `levelSanitasi` adalah null
  const isSanitasiNull = [
    toiletBerfungsi, aksesSanitasiMemadai, eksposurLimbah,
    limbahDikelolaAman, adaSeptictank, sanitasiBersih,
    aksesKelompokRentan, rasioMCKMemadai, keberlanjutanEkosistem, pemanfaatanAirEfisien
  ].every(value => value === null || value === undefined);

  // Jika semua field terkait null, set level ke null, jika tidak, hitung ulang
  const levelSaranaAirBersih = isSaranaAirBersihNull ? null : tentukanLevelSaranaAirBersih({
    airHanyaUntukMCK, aksesTerbatas, butuhUsahaJarak,
    airTersediaSetiapSaat, bisaDiminum, pengelolaanProfesional,
    aksesMudah, efisiensiAir, ramahLingkungan,
    keadilanAkses, adaptabilitasSistem
  });

  const levelSanitasi = isSanitasiNull ? null : tentukanLevelSanitasi({
    toiletBerfungsi, aksesSanitasiMemadai, eksposurLimbah,
    limbahDikelolaAman, adaSeptictank, sanitasiBersih,
    aksesKelompokRentan, rasioMCKMemadai, keberlanjutanEkosistem, pemanfaatanAirEfisien
  });

  // Validasi apakah formInputId ada
  const formInput = await prisma.formInput.findUnique({
    where: { id: formInputId },
  });
  if (!formInput) {
    throw new Error("Form input tidak ditemukan");
  }

  // Simpan ke database
  const newOutcome = await prisma.outcome.create({
    data: {
      formInputId,
      konsumsiAirPerTahun: parseFloat(konsumsiAirPerTahun),
      kualitasAir,
      rataRataTerpaparPenyakitSebelum: parseInt(rataRataTerpaparPenyakitSebelum),
      rataRataTerpaparPenyakitSesudah: parseInt(rataRataTerpaparPenyakitSesudah),
      bisaDipakaiMCK,
      bisaDiminum,
      ecoKeberlanjutan,
      levelSaranaAirBersih, // Disimpan otomatis
      levelSanitasi, // Disimpan otomatis

      // Simpan semua data tambahan
      airHanyaUntukMCK,
      aksesTerbatas,
      butuhUsahaJarak,
      airTersediaSetiapSaat,
      pengelolaanProfesional,
      aksesMudah,
      efisiensiAir,
      ramahLingkungan,
      keadilanAkses,
      adaptabilitasSistem,
      toiletBerfungsi,
      aksesSanitasiMemadai,
      eksposurLimbah,
      limbahDikelolaAman,
      adaSeptictank,
      sanitasiBersih,
      aksesKelompokRentan,
      rasioMCKMemadai,
      keberlanjutanEkosistem,
      pemanfaatanAirEfisien
    },
  });

  return newOutcome;
};



// Fungsi untuk menentukan level sarana air bersih
const tentukanLevelSaranaAirBersih = (data) => {
  if (data.efisiensiAir || data.ramahLingkungan || data.keadilanAkses || data.adaptabilitasSistem) {
    return 3; // Level 3 - Penyediaan Air Minum yang Dikelola dengan Aman dan Berkelanjutan
  }
  if (data.airTersediaSetiapSaat || data.bisaDiminum || data.pengelolaanProfesional || data.aksesMudah) {
    return 2; // Level 2 - Penyediaan Air Minum yang Dikelola dengan Aman
  }
  if (data.airHanyaUntukMCK || data.aksesTerbatas || data.butuhUsahaJarak) {
    return 1; // Level 1 - Sarana Air Bersih Dasar
  }
  return 0; // Tidak memenuhi syarat
};


// Fungsi untuk menentukan level sanitasi
const tentukanLevelSanitasi = (data) => {
  if (data.aksesKelompokRentan || data.rasioMCKMemadai || data.keberlanjutanEkosistem || data.pemanfaatanAirEfisien) {
    return 3; // Level 3 - Sanitasi yang Dikelola dengan Aman dan Berkelanjutan
  }
  if (data.limbahDikelolaAman || data.adaSeptictank || data.sanitasiBersih) {
    return 2; // Level 2 - Sanitasi yang Dikelola dengan Aman
  }
  if (data.toiletBerfungsi && data.aksesSanitasiMemadai && !data.eksposurLimbah) {
    return 1; // Level 1 - Sanitasi Dasar
  }
  return 0; // Tidak memenuhi syarat
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
// PATCH (Update) Outcome
const updateOutcomeService = async (id, data) => {
  try {
    const existingOutcome = await prisma.outcome.findUnique({
      where: { id },
    });

    if (!existingOutcome) {
      throw new Error("Outcome tidak ditemukan");
    }

    // Update hanya jika nilai baru dikirim, tetapi tidak menimpa nilai dengan null
    const updatedData = {
      ...existingOutcome,
      ...data,
    };

    // Cek apakah semua nilai terkait `levelSaranaAirBersih` adalah null
    const isSaranaAirBersihNull = [
      updatedData.airHanyaUntukMCK,
      updatedData.aksesTerbatas,
      updatedData.butuhUsahaJarak,
      updatedData.airTersediaSetiapSaat,
      updatedData.pengelolaanProfesional,
      updatedData.aksesMudah,
      updatedData.efisiensiAir,
      updatedData.ramahLingkungan,
      updatedData.keadilanAkses,
      updatedData.adaptabilitasSistem,
    ].every(value => value === null || value === undefined);

    // Cek apakah semua nilai terkait `levelSanitasi` adalah null
    const isSanitasiNull = [
      updatedData.toiletBerfungsi,
      updatedData.aksesSanitasiMemadai,
      updatedData.eksposurLimbah,
      updatedData.limbahDikelolaAman,
      updatedData.adaSeptictank,
      updatedData.sanitasiBersih,
      updatedData.aksesKelompokRentan,
      updatedData.rasioMCKMemadai,
      updatedData.keberlanjutanEkosistem,
      updatedData.pemanfaatanAirEfisien,
    ].every(value => value === null || value === undefined);

    // Jika semua field terkait null, set level ke null, jika tidak, hitung ulang
    const levelSaranaAirBersih = isSaranaAirBersihNull ? null : tentukanLevelSaranaAirBersih(updatedData);
    const levelSanitasi = isSanitasiNull ? null : tentukanLevelSanitasi(updatedData);

    // Update di database
    const updatedOutcome = await prisma.outcome.update({
      where: { id },
      data: {
        ...data,
        levelSaranaAirBersih,
        levelSanitasi,
      },
    });

    return updatedOutcome;
  } catch (error) {
    console.error("❌ Error saat update outcome:", error.message);
    throw new Error("Gagal memperbarui outcome: " + error.message);
  }
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

// Menghitung total jumlah KK dari FormInput
const getTotalKKService = async () => {
  const totalKK = await prisma.formInput.aggregate({
    _sum: {
      jmlhKK: true, // Menghitung total seluruh KK
    },
  });
  return totalKK._sum.jmlhKK || 0; // Jika tidak ada data, kembalikan 0
};

// Menghitung total jumlah Bantuan dari FormInput
const getTotalBantuanService = async () => {
  const totalBantuan = await prisma.formInput.aggregate({
    _sum: {
      jmlhBantuan: true, // Menghitung total seluruh Bantuan
    },
  });
  return totalBantuan._sum.jmlhBantuan || 0; // Jika tidak ada data, kembalikan 0
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
  getTotalKKService,
  getTotalBantuanService,
};
