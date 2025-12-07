// router/route.js
const express = require("express");
const router = express.Router();

const { genRoutes } = require("../controller/generateLinks");
const { uploadRoutes } = require("../controller/upload");

router.post("/api/generate-links", genRoutes);
router.post("/api/upload-image", uploadRoutes)

// Debug API
router.get("/debug", (_, res) => {
  let data = "😍 V3";
  return res.send({ data: data });
});

module.exports = router;