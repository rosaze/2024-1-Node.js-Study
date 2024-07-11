const express = require("express");

const router = express.Router();

//GET / 리우터
router.get("/", (req, res) => {
  res.send("Hello, Express");
});

module.exports = router;
