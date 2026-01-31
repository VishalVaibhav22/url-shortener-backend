const ALPHABET =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const BASE = 62n;

function encodeBigInt(n) {
  if (n === 0n) return "0";
  let s = "";
  while (n > 0n) {
    const rem = Number(n % BASE);
    s = ALPHABET[rem] + s;
    n = n / BASE;
  }
  return s;
}

function encode(input) {
  if (typeof input === "object" && input != null && input.toString)
    input = input.toString();

  if (typeof input === "string") {
    // hex ObjectId
    if (/^[0-9a-fA-F]{24}$/.test(input)) {
      const n = BigInt("0x" + input);
      return encodeBigInt(n);
    }
    // decimal string
    if (/^[0-9]+$/.test(input)) {
      return encodeBigInt(BigInt(input));
    }
  }

  if (typeof input === "number") return encodeBigInt(BigInt(input));
  if (typeof input === "bigint") return encodeBigInt(input);

  throw new Error("Unsupported id format for base62.encode");
}

module.exports = { encode };
const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

// converts a number into a Base62 string
exports.encode = (num) => {
  if (num === 0) return "0";

  let result = "";

  while (num > 0) {
    result = chars[num % 62] + result;
    num = Math.floor(num / 62);
  }

  return result;
};
