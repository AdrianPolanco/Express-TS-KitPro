import express, { json } from "express";
import healthcheck from "express-healthcheck"
import helmet from "helmet";
import passport from "./config/auth/auth.config";
import rateLimiter from "./config/resiliency/rate-limiter.config";
import { connectRedis, redisClient } from "./config/cache/cache.config";
import { testPostgresConnection } from "./config/database/sql/postgres/postgres.config";
import connectToMongoDb from "./config/database/mongo/mongo.config";
import requestLoggerMiddleware from "./middlewares/logging/logger.middleware";
import userRoutes from "./routes/v1/users/users.routes";
import productRoutes from "./routes/v1/products/products.routes";
import cacheMiddleware from './middlewares/cache/cache.middleware';

const initializeInfrastructure = async () => {
    //await redisClient.flushAll();
    // Connect to MongoDB
    await connectToMongoDb();

    //Connect and test Postgres connection
    await testPostgresConnection();

    //Connect to Redis
    await connectRedis();
};


const app = express();
const v1Router = express.Router();

v1Router.use("/users", userRoutes);
v1Router.use("/products", productRoutes);

app.use("/health", healthcheck());
app.use(helmet())
app.use(json());
app.use(rateLimiter);
app.use(passport.initialize());

app.use(requestLoggerMiddleware)

app.use("/api/v1", v1Router);

export default app;

export {initializeInfrastructure}
