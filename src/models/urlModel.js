const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema(
  {
    originalUrl: { type: String, required: true },
    shortCode: { type: String, index: true, unique: true, sparse: true },
    clickCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Url", UrlSchema);
