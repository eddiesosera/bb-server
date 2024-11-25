import mongoose from "mongoose";
import app from "./src/app.js";
import config from "./src/config/config.js";
import logger from "./src/config/logger.js";

let server: any;

// Connect to MongoDB
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info("Connected to MongoDB");
  server = app.listen(config.port, () => {
    logger.info(`Server is running on port ${config.port}`);
  });
});

// Graceful shutdown handlers
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1); // Exit with a failure code
    });
  } else {
    process.exit(1); // Exit immediately if no server instance exists
  }
};

// Handle unexpected errors globally
const unexpectedErrorHandler = (error: Error) => {
  logger.error(error);
  exitHandler(); // Close server and exit process
};

// Catch uncaught exceptions and unhandled promise rejections
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

// Gracefully handle SIGTERM (e.g., during containerized deployments)
process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
