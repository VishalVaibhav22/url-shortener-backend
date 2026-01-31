const Url = require("../models/urlModel");

// save original URL
exports.saveUrl = async (originalUrl) => {
  const doc = await Url.create({ originalUrl });
  return doc._id;
};

// update short code
exports.updateShortCode = async (id, shortCode) => {
  return Url.findByIdAndUpdate(id, { shortCode });
};

// find by short code
exports.findByCode = async (code) => {
  return Url.findOne({ shortCode: code });
};
