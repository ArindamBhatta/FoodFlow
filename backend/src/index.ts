import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import apiRouter from "./api";
import connectDB from "./infrastructure/database/connection";
import logger from "./infrastructure/logger/winston";

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const port = process.env.PORT || 8111;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

// API routes
app.use("/api", apiRouter());

// Start server
const startServer = async () => {
  try {
    // Initialize SQLite
    await connectDB();

    // Start listening
    const server = app.listen(port, () => {
      logger.info(`✅ Server is running on http://localhost:${port}`);
    });

    // Handle graceful shutdown
    const gracefulShutdown = async () => {
      logger.info("🛑 Received shutdown signal, closing server...");

      server.close(async () => {
        logger.info("👋 HTTP server closed");
        process.exit(0);
      });
    };

    // Handle termination signals
    process.on("SIGTERM", gracefulShutdown);
    process.on("SIGINT", gracefulShutdown);
  } catch (error) {
    logger.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

// Start the application
startServer();


