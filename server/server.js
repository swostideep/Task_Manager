// server.js

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// Load environment variables
dotenv.config();

// Create express app
const app = express();

// Middlewares
app.use(cors());

app.use(express.json()); // To parse JSON in request body
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// MongoDB Connection
const MONGO_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    // Start the server only after successful DB connection
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
