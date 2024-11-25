import winston from "winston";
import config from "./config.js";

// Custom error formatter to include message and stack for better error traceability
const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    return { ...info, message: info.message, stack: info.stack };
  }
  return info;
});

// Logger configuration with environment-specific settings
const logger = winston.createLogger({
  level: config.env === "development" ? "debug" : "info",
  format: winston.format.combine(
    enumerateErrorFormat(),
    config.env === "development"
      ? winston.format.colorize() // Add color to logs for better readability
      : winston.format.uncolorize(), // Ensure clean output in non-dev environments
    winston.format.splat(), // Allow string interpolation in log messages
    winston.format.printf(
      ({ level, message, stack }) => `${level}: ${message} ${stack || ""}` // Custom log format
    )
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
