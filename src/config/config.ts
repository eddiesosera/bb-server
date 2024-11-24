import dotenv from "dotenv";

dotenv.config();

const env = process.env.NODE_ENV || "development";

interface IConfig {
  env: any;
  port: any;
  mongoose: any;
  jwt: any;
  password_salt: number;
}

const config: IConfig = {
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
  password_salt: Number(process.env.PASSWORD_SALT),
};

export default config;
