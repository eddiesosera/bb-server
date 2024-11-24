import authorModel from "../models/author.model.js";
import config from "./config.js";
import { Strategy, ExtractJwt } from "passport-jwt";

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

export const jwtStrategy = new Strategy(
  jwtOptions,
  async (jwtPayload, done) => {
    try {
      const author = await authorModel.findById(jwtPayload.sub);
      if (author) {
        return done(null, author);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  }
);
