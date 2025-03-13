const ImageKit = require("imagekit");
require("dotenv").config();

// ✅ Debugging: Cek apakah variabel environment sudah terisi
console.log("🔍 IMAGEKIT_PUBLIC_KEY:", process.env.IMAGEKIT_PUBLIC_KEY);
console.log("🔍 IMAGEKIT_PRIVATE_KEY:", process.env.IMAGEKIT_PRIVATE_KEY ? "HIDDEN" : "MISSING");
console.log("🔍 IMAGEKIT_URL_ENDPOINT:", process.env.IMAGEKIT_URL_ENDPOINT);

// ✅ Pastikan variabel environment sudah tersedia
if (!process.env.IMAGEKIT_PUBLIC_KEY || !process.env.IMAGEKIT_PRIVATE_KEY || !process.env.IMAGEKIT_URL_ENDPOINT) {
  throw new Error("❌ ImageKit environment variables are missing!");
}

// Konfigurasi ImageKit
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const uploadImageToImageKit = async (file) => {
  try {
    // ✅ Debugging: Pastikan file ada
    if (!file) {
      throw new Error("File tidak ditemukan");
    }

    console.log("📸 Uploading file:", file.originalname);

    const uploadResponse = await imagekit.upload({
      file: file.buffer.toString("base64"), // Konversi buffer ke Base64
      fileName: file.originalname,
    });

    console.log("✅ Image uploaded successfully:", uploadResponse.url);
    return uploadResponse.url;
  } catch (error) {
    console.error("❌ ImageKit Upload Error:", error.message);
    throw new Error("Image upload failed: " + error.message);
  }
};

module.exports = { uploadImageToImageKit, imagekit };
