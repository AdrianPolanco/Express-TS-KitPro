import express, { json } from "express";
import healthcheck from "express-healthcheck"
import helmet from "helmet";
import passport from "./config/auth/auth.config";
import rateLimiter from "./config/resiliency/rate-limiter.config";
import { connectRedis } from "./config/cache/cache.config";
import { testPostgresConnection } from "./config/database/sql/postgres/postgres.config";
import connectToMongoDb from "./config/database/mongo/mongo.config";

const app = express();

app.use("/health", healthcheck());
app.use(helmet())
app.use(json());
app.use(rateLimiter);
app.use(passport.initialize());

const initializeInfrastructure = async () => {
    // Connect to MongoDB
    await connectToMongoDb();

    //Connect and test Postgres connection
    await testPostgresConnection();

    //Connect to Redis
    await connectRedis();
}


export default app;
export {initializeInfrastructure}
