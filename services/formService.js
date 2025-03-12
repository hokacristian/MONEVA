const prisma = require('../configs/prisma');
const imagekit = require('../configs/imagekit');

const tambahFormInputService = async (data, file) => {
  const { 
    lokasi, lat, long, jmlhBantuan, jenisBantuan, jmlhKK, 
    jmlhPerempuan, jmlhLaki, debitAir, pemakaianAir, sanitasi 
  } = data;

  const jmlhMasyarakat = parseInt(jmlhPerempuan) + parseInt(jmlhLaki);

  let imgUrl = null;

  if (file) {
    const uploadImage = await imagekit.upload({
      file: file.buffer,
      fileName: `form_${Date.now()}.jpg`,
    });
    imgUrl = uploadImage.url;
  }

  const newFormInput = await prisma.formInput.create({
    data: {
      lokasi,
      lat: parseFloat(lat),
      long: parseFloat(long),
      img: imgUrl,
      jmlhBantuan: parseInt(jmlhBantuan),
      jenisBantuan,
      jmlhKK: parseInt(jmlhKK),
      jmlhPerempuan: parseInt(jmlhPerempuan),
      jmlhLaki: parseInt(jmlhLaki),
      jmlhMasyarakat,
      debitAir,
      pemakaianAir,
      sanitasi,
    },
  });

  return newFormInput;
};

const tambahOutcomeService = async (formInputId, data) => {
  const { 
    konsumsiAirPerTahun, kualitasAir, rataRataTerpaparPenyakitSebelum, 
    rataRataTerpaparPenyakitSesudah, awarenessMasyarakat, deskripsiAwareness, 
    penilaianSaranaAirBersih, penilaianSanitasi 
  } = data;

  const formInput = await prisma.formInput.findUnique({ where: { id: formInputId } });
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
      penilaianSanitasi
    },
  });

  return newOutcome;
};

const tambahDampakService = async (formInputId, data) => {
    const {
      biayaBerobatSebelum, biayaBerobatSesudah, biayaAirBersihSebelum, biayaAirBersihSesudah,
      peningkatanEkonomiSebelum, peningkatanEkonomiSesudah, penurunanOrangSakitSebelum, penurunanOrangSakitSesudah,
      penurunanStuntingSebelum, penurunanStuntingSesudah, peningkatanIndeksKesehatanSebelum, peningkatanIndeksKesehatanSesudah,
      volumeLimbahDikelola, prosesKonservasiAir, penurunanIndexPencemaranSebelum, penurunanIndexPencemaranSesudah
    } = data;
  
    // Validasi apakah formInputId ada
    const formInput = await prisma.formInput.findUnique({ where: { id: formInputId } });
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
      },
    });
  
    return newDampak;
  };

  // GET All Form Inputs
const getAllFormInputsService = async () => {
    return await prisma.formInput.findMany({
      include: { outcome: true, dampak: true } // Menyertakan relasi
    });
  };
  
  // GET Single Form Input
  const getFormInputByIdService = async (id) => {
    return await prisma.formInput.findUnique({
      where: { id },
      include: { outcome: true, dampak: true } // Menyertakan relasi
    });
  };
  
  const updateFormInputService = async (id, data, file) => {
    let updatedData = { ...data };
  
    // Jika ada file yang diunggah, upload ke ImageKit
    if (file) {
      const uploadImage = await imagekit.upload({
        file: file.buffer,
        fileName: `form_${Date.now()}.jpg`,
      });
      updatedData.img = uploadImage.url;
    }
  
    // Konversi nilai yang seharusnya numerik
    if (updatedData.jmlhBantuan) updatedData.jmlhBantuan = parseInt(updatedData.jmlhBantuan);
    if (updatedData.jmlhKK) updatedData.jmlhKK = parseInt(updatedData.jmlhKK);
    if (updatedData.jmlhPerempuan) updatedData.jmlhPerempuan = parseInt(updatedData.jmlhPerempuan);
    if (updatedData.jmlhLaki) updatedData.jmlhLaki = parseInt(updatedData.jmlhLaki);
    if (updatedData.lat) updatedData.lat = parseFloat(updatedData.lat);
    if (updatedData.long) updatedData.long = parseFloat(updatedData.long);
  
    // Hitung ulang jumlah masyarakat
    if (updatedData.jmlhPerempuan !== undefined && updatedData.jmlhLaki !== undefined) {
      updatedData.jmlhMasyarakat = updatedData.jmlhPerempuan + updatedData.jmlhLaki;
    }
  
    return await prisma.formInput.update({
      where: { id },
      data: updatedData
    });
  };
  

  // GET All Outcomes
const getAllOutcomesService = async () => {
    return await prisma.outcome.findMany({
      include: { formInput: true }
    });
  };
  
  // GET Single Outcome
  const getOutcomeByIdService = async (id) => {
    return await prisma.outcome.findUnique({
      where: { id },
      include: { formInput: true }
    });
  };
  
  // PATCH (Update) Outcome
  const updateOutcomeService = async (id, data) => {
    return await prisma.outcome.update({
      where: { id },
      data
    });
  };

  // GET All Dampak
const getAllDampakService = async () => {
    return await prisma.dampak.findMany({
      include: { formInput: true }
    });
  };
  
  // GET Single Dampak
  const getDampakByIdService = async (id) => {
    return await prisma.dampak.findUnique({
      where: { id },
      include: { formInput: true }
    });
  };
  
  // PATCH (Update) Dampak
  const updateDampakService = async (id, data) => {
    return await prisma.dampak.update({
      where: { id },
      data
    });
  };
  

module.exports = {
  tambahFormInputService,getAllFormInputsService, getAllDampakService, getDampakByIdService, updateDampakService,
  tambahOutcomeService,tambahDampakService, getFormInputByIdService, updateFormInputService, updateOutcomeService,getOutcomeByIdService,getAllOutcomesService

};
