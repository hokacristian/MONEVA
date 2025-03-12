const { tambahFormInputService,getAllFormInputsService, getAllDampakService, getDampakByIdService, updateDampakService,
  tambahOutcomeService,tambahDampakService, getFormInputByIdService, updateFormInputService, updateOutcomeService,getOutcomeByIdService,getAllOutcomesService } = require('../services/formService');


  const tambahFormInput = async (req, res) => {
    try {
      const newFormInput = await tambahFormInputService(req.body, req.file);
      res.status(201).json({ message: "Form input berhasil disimpan", data: newFormInput });
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
    }
  };
  
  const getAllFormInputs = async (req, res) => {
    try {
      const data = await getAllFormInputsService();
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
    }
  };
  
  const getFormInputById = async (req, res) => {
    try {
      const data = await getFormInputByIdService(parseInt(req.params.id));
      if (!data) return res.status(404).json({ message: "Form input tidak ditemukan" });
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
    }
  };
  
  const updateFormInput = async (req, res) => {
    try {
      const updatedFormInput = await updateFormInputService(parseInt(req.params.id), req.body, req.file);
      res.status(200).json({ message: "Form input berhasil diperbarui", data: updatedFormInput });
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
    }
  };
  


const tambahOutcome = async (req, res) => {
  try {
    const formInputId = parseInt(req.params.id);
    const newOutcome = await tambahOutcomeService(formInputId, req.body);
    res.status(201).json({ message: "Outcome berhasil disimpan", data: newOutcome });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
  }
};

const getAllOutcomes = async (req, res) => {
  try {
    const data = await getAllOutcomesService();
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
  }
};

const getOutcomeById = async (req, res) => {
  try {
    const data = await getOutcomeByIdService(parseInt(req.params.id));
    if (!data) return res.status(404).json({ message: "Outcome tidak ditemukan" });
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
  }
};

const updateOutcome = async (req, res) => {
  try {
    const updatedOutcome = await updateOutcomeService(parseInt(req.params.id), req.body);
    res.status(200).json({ message: "Outcome berhasil diperbarui", data: updatedOutcome });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
  }
};

const tambahDampak = async (req, res) => {
  try {
    const formInputId = parseInt(req.params.id);
    const newDampak = await tambahDampakService(formInputId, req.body);
    res.status(201).json({ message: "Dampak berhasil disimpan", data: newDampak });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
  }
};

const getAllDampak = async (req, res) => {
  try {
    const data = await getAllDampakService();
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
  }
};

const getDampakById = async (req, res) => {
  try {
    const data = await getDampakByIdService(parseInt(req.params.id));
    if (!data) return res.status(404).json({ message: "Dampak tidak ditemukan" });
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
  }
};

const updateDampak = async (req, res) => {
  try {
    const updatedDampak = await updateDampakService(parseInt(req.params.id), req.body);
    res.status(200).json({ message: "Dampak berhasil diperbarui", data: updatedDampak });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
  }
};

module.exports = {
  tambahFormInput,
  getAllFormInputs,
  getFormInputById,
  updateFormInput, 
  tambahOutcome,tambahDampak, getAllOutcomes,
  getOutcomeById,
  updateOutcome, getAllDampak,
  getDampakById,
  updateDampak
};
