const express = require("express");
const cors = require("cors");
const path = require("path");
const formRoutes = require("./routes/formRoutes");
const authRoutes = require("./routes/authRoutes");
const placeRoutes = require("./routes/placeRoutes");


const app = express();

// === CRONJOB: Membuat akun setiap 5 hari sekali secara random ===
const cron = require("node-cron");
const { registerUser } = require("./services/authService");
const crypto = require("crypto");

// Fungsi untuk membuat akun random (contoh sederhana)
async function createRandomAccount() {
  const email = `user${Date.now()}@example.com`;
  const name = `User${Math.floor(Math.random() * 10000)}`;
  const password = crypto.randomBytes(8).toString("hex");
  const role = Math.random() < 0.5 ? "ADMIN" : "PETUGAS";
  try {
    await registerUser(email, name, password, role);
    console.log(`Akun dibuat: ${email} | ${role}`);
  } catch (err) {
    console.error("Gagal membuat akun:", err.message);
  }
}

// Fungsi untuk menjadwalkan eksekusi berikutnya secara random dalam 5 hari ke depan
function scheduleNextAccountCreation() {
  // 5 hari dalam ms
  const fiveDaysMs = 5 * 24 * 60 * 60 * 1000;
  // Ambil waktu random antara sekarang dan 5 hari ke depan
  const randomDelay = Math.floor(Math.random() * fiveDaysMs);
  setTimeout(async () => {
    await createRandomAccount();
    scheduleNextAccountCreation(); // Jadwalkan lagi setelah selesai
  }, randomDelay);
  console.log(`Akun akan dibuat dalam ${(randomDelay / (1000 * 60 * 60)).toFixed(2)} jam dari sekarang.`);
}

// Mulai penjadwalan saat server start
scheduleNextAccountCreation();




// Middleware untuk mengizinkan CORS dengan credentials (cookies)
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000", "http://localhost:3001", "https://moneva-wine.vercel.app"], 
    credentials: true, 
    methods: "GET,POST,PUT,DELETE,PATCH",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// Gunakan express.json() hanya untuk non-multipart requests
app.use((req, res, next) => {
  if (req.headers["content-type"]?.startsWith("multipart/form-data")) {
    next();
  } else {
    express.json()(req, res, next);
  }
});

// Middleware untuk parsing JSON
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/form", formRoutes);
app.use("/", placeRoutes);


// Static files (jika diperlukan)
app.use("/public", express.static(path.join(__dirname, "../public")));

module.exports = app;
