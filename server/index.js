import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import userRoute from "./routes/user.routes.js";
import { setupDatabase } from "./db/db.js";
import { seedUser } from "./models/user.model.js";

// Environment setup
dotenv.config();
const PORT = process.env.PORT || 5173;
const NODE_ENV = process.env.NODE_ENV || "development";
const allowedOrigins = [
  "http://localhost:5173", // Local frontend
  process.env.FRONTEND_URL, // Deployed frontend URL from environment variables
];

// MongoDB setup
setupDatabase();
seedUser();

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Express app setup
const app = express();

// CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  "/userImages",
  express.static(path.join(__dirname, "public", "userImages"))
);

// API routes
app.use("/api", userRoute);

// Fallback for deployed environment to serve frontend
if (NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "public")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
  });
}

// Start the server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
