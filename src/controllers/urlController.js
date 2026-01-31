const urlService = require("../services/urlService");

// POST /api/url/shorten
exports.shortenUrl = async (req, res, next) => {
  try {
    const { originalUrl } = req.body;

    const result = await urlService.createShortUrl(originalUrl);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// GET /api/url/r/:shortCode   (based on route fix)
exports.redirectUrl = async (req, res, next) => {
  try {
    const originalUrl = await urlService.getOriginalUrl(req.params.shortCode);
    res.redirect(originalUrl);
  } catch (error) {
    next(error);
  }
};

// GET /api/url/test
exports.testRoute = (req, res) => {
  res.json({ message: "Route working" });
};
