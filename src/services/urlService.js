// service layer
const repository = require("../repositories/urlRepository");
const base62 = require("../utils/base62");

let getClient;
try {
  ({ getClient } = require("../config/redisClient"));
} catch (err) {
  console.warn("Redis not configured, skipping cache");
}

// create short URL
exports.createShortUrl = async (originalUrl) => {
  const id = await repository.saveUrl(originalUrl);

  const shortCode = base62.encode(id);

  await repository.updateShortCode(id, shortCode);

  // cache mapping shortCode -> originalUrl
  if (getClient) {
    try {
      const client = await getClient();
      if (client) {
        await client.set(`short:${shortCode}`, originalUrl, { EX: 3600 });
      }
    } catch (err) {
      console.error("Redis set failed:", err.message);
    }
  }

  return {
    
    shortURL: `http://localhost:3000/api/url/r/${shortCode}`,
  };
};

// get original URL
exports.getOriginalUrl = async (code) => {
  // try cache first
  if (getClient) {
    try {
      const client = await getClient();
      if (client) {
        const cached = await client.get(`short:${code}`);
        if (cached) return cached;
      }
    } catch (err) {
      console.error("Redis get failed:", err.message);
    }
  }

  const data = await repository.findByCode(code);

  if (!data) {
    const error = new Error("URL not found");
    error.statusCode = 404;
    throw error;
  }

  // populate cache
  if (getClient) {
    try {
      const client = await getClient();
      if (client) {
        await client.set(`short:${code}`, data.originalUrl, { EX: 3600 });
      }
    } catch (err) {
      console.error("Redis set failed:", err.message);
    }
  }

  return data.originalUrl;
};
