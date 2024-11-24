import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import config from "./config.js";
import Author from "../models/author.model.js";

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

export const jwtStrategy = new JwtStrategy(
  jwtOptions,
  async (payload, done) => {
    try {
      const author = await Author.findById(payload.sub);
      if (author) {
        return done(null, author);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  }
);
