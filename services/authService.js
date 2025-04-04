// services/authService.js
const prisma = require("../configs/prisma");
const bcrypt = require("bcryptjs");

const registerUser = async (email, name, password, role) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      role,
    },
  });

  return user;
};

// Fungsi untuk mencari user berdasarkan email
const findUserByEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
};

const findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,  // 🔥 Tambahkan ini agar `id` ikut diambil
      name: true,
      email: true,
      role: true,
    },
  });
};


module.exports = {
  registerUser,
  findUserByEmail,findUserById
};
