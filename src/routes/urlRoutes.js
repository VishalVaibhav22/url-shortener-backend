const express = require("express");
const {
  testRoute,
  shortenUrl,
  redirectUrl
} = require("../controllers/urlController");

const router = express.Router();

router.get("/test", testRoute);
router.post("/shorten", shortenUrl);


router.get("/r/:shortCode", redirectUrl);

module.exports = router;
