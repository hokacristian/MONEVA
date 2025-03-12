// controllers/authController.js
const { registerUser, findUserByEmail } = require("../services/authService");
const { generateToken } = require("../configs/jwt");
const bcrypt = require("bcryptjs");

/**
 * Register: hanya untuk ADMIN atau PETUGAS
 */
const register = async (req, res) => {
  const { email, name, password, role } = req.body;

  // Validasi input
  if (!email || !name || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Pastikan role yang didaftarkan hanya ADMIN atau PETUGAS
  if (role !== "ADMIN" && role !== "PETUGAS") {
    return res
      .status(403)
      .json({ message: "Only ADMIN or PETUGAS can register" });
  }

  try {
    // Cek apakah email sudah terdaftar
    const userExists = await findUserByEmail(email);
    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Jika belum terdaftar, buat user baru
    const user = await registerUser(email, name, password, role);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

/**
 * Login
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  // Validasi input
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Cari user berdasarkan email
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Cek password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate token
    const token = generateToken({ id: user.id, role: user.role });
    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

/**
 * Logout
 */
const logout = (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {
  register,
  login,
  logout,
};
