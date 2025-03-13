const {
    tambahPlaceService,
    getAllPlacesService,
    deletePlaceService,getTotalPlacesService
  } = require('../services/placeService');
  
  // Menambahkan tempat baru
  const tambahPlace = async (req, res) => {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ message: "Nama tempat harus diisi" });
      }
  
      const newPlace = await tambahPlaceService(name);
      res.status(201).json({ message: "Tempat berhasil ditambahkan", data: newPlace });
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
    }
  };
  
  // Mengambil semua tempat
  const getAllPlaces = async (req, res) => {
    try {
      const places = await getAllPlacesService();
      res.status(200).json({ data: places });
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
    }
  };
  
  // Menghapus tempat berdasarkan ID
  const deletePlace = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "ID tempat harus disertakan" });
      }
  
      await deletePlaceService(id);
      res.status(200).json({ message: "Tempat berhasil dihapus" });
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
    }
  };

  const getTotalPlaces = async (req, res) => {
    try {
      const total = await getTotalPlacesService();
      res.status(200).json({ totalPlaces: total });
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
    }
  };
  
  module.exports = {
    tambahPlace,
    getAllPlaces,
    deletePlace,getTotalPlaces,
  };
  