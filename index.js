require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connection");
const cors = require("cors");
const path = require("path");

const uploadRoutes = require("./routes/upload");
const genRoutes = require("./routes/generateLinks");

const app = express();
app.use(cors());
app.use(express.json());

// Serve uploaded images statically (dev)
app.use(
  "/uploads",
  express.static(path.join(__dirname, "..", "public", "uploads"))
);
app.use("/api/upload-image", uploadRoutes);
app.use("/api/generate-links", genRoutes);
connectDB();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server Run on ${PORT} ...`);
});