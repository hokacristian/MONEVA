const prisma = require('../configs/prisma');
const imagekit = require('../configs/imagekit');

const tambahFormInput = async (req, res) => {
  try {
    const { 
      lokasi, lat, long, jmlhBantuan, jenisBantuan, jmlhKK, 
      jmlhPerempuan, jmlhLaki, debitAir, pemakaianAir, sanitasi
    } = req.body;

    // Hitung jumlah masyarakat secara otomatis dari jumlah perempuan dan laki-laki
    const jmlhMasyarakat = parseInt(jmlhPerempuan) + parseInt(jmlhLaki);

    let imgUrl = null;

    // Upload foto jika ada
    if (req.file) {
      const uploadImage = await imagekit.upload({
        file: req.file.buffer, // Gambar dari multer
        fileName: `form_${Date.now()}.jpg`,
      });
      imgUrl = uploadImage.url; // URL dari ImageKit
    }

    // Simpan data ke database
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
        jmlhMasyarakat, // Nilai otomatis
        debitAir,
        pemakaianAir,
        sanitasi,
      },
    });

    res.status(201).json({
      message: "Form input berhasil disimpan",
      data: newFormInput
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
  }
};

const tambahOutcome = async (req, res) => {
  try {
    const { 
      formInputId, 
      konsumsiAirPerTahun, 
      kualitasAir, 
      rataRataTerpaparPenyakitSebelum, 
      rataRataTerpaparPenyakitSesudah, 
      awarenessMasyarakat,
      penilaianSaranaAirBersih,
      penilaianSanitasi
    } = req.body;

    // Validasi apakah formInputId ada di database
    const formInput = await prisma.formInput.findUnique({
      where: { id: parseInt(formInputId) }
    });
    if (!formInput) {
      return res.status(404).json({ message: "Form input tidak ditemukan" });
    }

    // Simpan data ke database
    const newOutcome = await prisma.outcome.create({
      data: {
        formInputId: parseInt(formInputId),
        konsumsiAirPerTahun: parseFloat(konsumsiAirPerTahun),
        kualitasAir,
        rataRataTerpaparPenyakitSebelum: parseInt(rataRataTerpaparPenyakitSebelum),
        rataRataTerpaparPenyakitSesudah: parseInt(rataRataTerpaparPenyakitSesudah),
        awarenessMasyarakat,
        penilaianSaranaAirBersih,
        penilaianSanitasi
      },
    });

    res.status(201).json({
      message: "Outcome berhasil disimpan",
      data: newOutcome
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
  }
};

module.exports = {
  tambahFormInput,tambahOutcome
};
