import winston from "winston";
import config from "./config.js";

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    return { ...info, message: info.message, stack: info.stack };
  }
  return info;
});

const logger = winston.createLogger({
  level: config.env === "development" ? "debug" : "info",
  format: winston.format.combine(
    enumerateErrorFormat(),
    config.env === "development"
      ? winston.format.colorize()
      : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(
      ({ level, message, stack }) => `${level}: ${message} ${stack || ""}`
    )
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
