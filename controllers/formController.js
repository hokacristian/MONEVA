const prisma = require('../configs/prisma');
const imagekit = require('../configs/imagekit');

const tambahFormInput = async (req, res) => {
  try {
    const { 
      lokasi, lat, long, jmlhBantuan, jenisBantuan, jmlhKK, 
      jmlhMasyarakat, jmlhPerempuan, jmlhLaki, debitAir, 
      pemakaianAir, sanitasi
    } = req.body;

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
        jmlhMasyarakat: parseInt(jmlhMasyarakat),
        jmlhPerempuan: parseInt(jmlhPerempuan),
        jmlhLaki: parseInt(jmlhLaki),
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

module.exports = {
  tambahFormInput
};
