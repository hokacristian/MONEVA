const prisma = require('../configs/prisma');

// Menambahkan tempat baru (POST)
const tambahPlaceService = async (name) => {
  return await prisma.place.create({
    data: { name },
  });
};

// Mengambil semua tempat (GET)
const getAllPlacesService = async () => {
  return await prisma.place.findMany();
};

// Menghapus tempat berdasarkan ID (DELETE)
const deletePlaceService = async (id) => {
  return await prisma.place.delete({
    where: { id: parseInt(id) },
  });
};

// Menghitung total tempat yang ada di database
const getTotalPlacesService = async () => {
  return await prisma.place.count(); // Menghitung jumlah semua tempat
};

module.exports = {
  tambahPlaceService,
  getAllPlacesService,
  deletePlaceService,getTotalPlacesService
};
