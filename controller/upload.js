const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

// simple disk storage (dev). Consider S3 for production.
const storage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, path.join(__dirname, "..", "..", "public", "uploads")),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "-")),
});
const upload = multer({ storage });

router.post("/", upload.single("image"), (req, res) => {});

exports.uploadRoutes = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "no file" });
  const BASE =
    process.env.BASE_URL || `http://localhost:${process.env.PORT || 4000}`;
  const imageUrl = `${BASE}/uploads/${req.file.filename}`;
  res.json({ imageUrl });
};
