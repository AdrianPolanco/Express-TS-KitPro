import mongoose from "mongoose";
import envConfig from "../../env/env.config";
import logger from "../../logging/winston.config";
import retryOperation from "../../resiliency/retry.config";

const connectToMongoDb = async () => { 
    await retryOperation(async () => {
            try {
                await mongoose.connect(envConfig.mongoUri);
                logger.info("MongoDB connected");
            } catch (error) {
                logger.error(error);
                throw error;
            }
        }
    )
}

export default connectToMongoDb;
