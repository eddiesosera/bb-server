import express from "express";
import helmet from "helmet";
import xssClean from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import cors from "cors";
import passport from "passport";
import httpStatus from "http-status";
import morgan from "morgan";
import routes from "./routes/index.js";
import { errorConverter, errorHandler } from "./middleware/error.js";
import ApiError from "./utils/ApiError.js";
import config from "./config/config.js";
import { jwtStrategy } from "./config/passport.js";

const app = express();

// Set up morgan for logging
if (config.env !== "test") {
  app.use(morgan("combined"));
}

// Set security HTTP headers
app.use(helmet());

// Parse JSON and urlencoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sanitize request data
app.use(xssClean());
app.use(mongoSanitize());

// Gzip compression
app.use(compression());

// Enable CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://bb-frontend-psi.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Initialize Passport for authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// API routes
app.use("/api", routes);

// Send back a 404 error for unknown routes
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// Convert errors to ApiError, if needed
app.use(errorConverter);

// Handle errors
app.use(errorHandler);

export default app;
