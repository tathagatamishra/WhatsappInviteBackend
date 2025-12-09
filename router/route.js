// router/route.js
const express = require("express");
const router = express.Router();

const { generateLinks } = require("../controller/generateLinks");

router.post("/generate-links", generateLinks)

// Debug API
router.get("/debug", (_, res) => {
  let data = "😍 V3";
  return res.send({ data: data });
});

module.exports = router;
