import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptionsWithoutRequest } from "passport-jwt";
import envConfig from "../env/env.config";
import MongoUser from "../../models/mongo/schemas/user.schema";
import PostgreUser from "../../models/sql/user.model";

const opts: StrategyOptionsWithoutRequest = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: envConfig.jwtSecret
};


const jwtMongoStrategy = new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
        const user = await MongoUser.findById(jwtPayload.id);

        if (user) return done(null, user);       
        return done(null, false);
    }catch(error) {
        done(error, false);
    }
})
 
const jwtPostgresStrategy = new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
        const user = await PostgreUser.findByPk(jwtPayload.id);
        if (user) return done(null, user);
        return done(null, false);
    } catch (error) {
        done(error, false);
    }
});

passport.use('mongo', jwtMongoStrategy);
passport.use('postgres', jwtPostgresStrategy);

export default passport;