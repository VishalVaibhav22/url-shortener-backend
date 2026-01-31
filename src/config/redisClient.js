let client;

async function getClient() {
  if (client) return client;

  const url = process.env.REDIS_URL || process.env.REDIS_URI;
  if (!url) {
    // Redis not configured — return null and callers should degrade gracefully
    return null;
  }

  let createClient;
  try {
    // require lazily to avoid crash when `redis` package is not installed
    ({ createClient } = require("redis"));
  } catch (err) {
    console.warn("`redis` package not installed; skipping cache");
    return null;
  }

  client = createClient({ url });
  client.on("error", (err) => console.error("Redis error:", err));

  try {
    await client.connect();
    console.log("Redis connected");
  } catch (err) {
    console.error("Failed to connect Redis:", err.message);
    client = null;
  }

  return client;
}

module.exports = { getClient };
