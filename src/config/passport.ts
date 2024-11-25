import authorModel from "../models/author.model.js";
import config from "./config.js";
import { Strategy, ExtractJwt } from "passport-jwt";

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from Authorization header
};

export const jwtStrategy = new Strategy(
  jwtOptions,
  async (jwtPayload, done) => {
    try {
      const author = await authorModel.findById(jwtPayload.sub);
      if (author) {
        return done(null, author); // Successful authentication
      }
      return done(null, false); // JWT is valid but user does not exist
    } catch (error) {
      return done(error, false);
    }
  }
);
