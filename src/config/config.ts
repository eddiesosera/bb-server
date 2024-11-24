import dotenv from "dotenv";

dotenv.config();

const env = process.env.NODE_ENV || "development";

const config = {
  env,
  port: process.env.PORT || 5000,
  mongoose: {
    url: process.env.MONGO_URI || "mongodb://localhost:27017/blog",
    options: {},
  },
  jwt: {
    secret: process.env.JWT_SECRET || "your-secret-key",
    accessExpirationMinutes: 30,
    refreshExpirationDays: 30,
  },
};

export default config;
