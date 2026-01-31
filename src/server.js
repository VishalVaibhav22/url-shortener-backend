const path = require("path");
const dotenv = require("dotenv");

// load .env from project root
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 3000;

// connect database
connectDB();

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
