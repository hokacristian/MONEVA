const express = require("express");
const cors = require("cors");
const path = require("path");
const formRoutes = require("./routes/formRoutes");
const authRoutes = require("./routes/authRoutes");
const placeRoutes = require("./routes/placeRoutes");

const app = express();




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
