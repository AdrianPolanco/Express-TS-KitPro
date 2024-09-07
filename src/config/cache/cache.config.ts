import { createClient } from "redis";
import envConfig from "../env/env.config";
import logger from "../logging/winston.config";
import retryOperation from "../resiliency/retry.config";

const redisClient = createClient({ url: envConfig.redisUrl });

const connectRedis = async () => {
    await retryOperation(async () => {
        try {
            await redisClient.connect();
            logger.info("Redis Connected");
        } catch (error) {
            logger.error("Error connecting to Redis:", error);
            throw error;
        }
    });
};

export { redisClient, connectRedis };