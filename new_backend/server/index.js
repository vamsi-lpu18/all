const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./routers/user.js");
const todoRouter = require("./routers/todo.js");
const cookieparser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

const app = express();
// Allow requests from the Vite dev server and allow cookies
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieparser());
app.use("/api", router);
app.use("/api/todo", todoRouter);

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/mydb")
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.listen(3000, () => {
  console.log("🚀 Server is running on port 3000");
});
