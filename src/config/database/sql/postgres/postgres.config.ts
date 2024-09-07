import { Sequelize } from "sequelize";
import envConfig from "../../../env/env.config";
import logger from "../../../logging/winston.config";
import retryOperation from "../../../resiliency/retry.config";
import User from "../../../../models/sql/user.model";
import Product from "../../../../models/sql/product.model";

const postgresDatabase = new Sequelize({
    dialect: 'postgres',
    host: envConfig.dbHost,
    port: envConfig.dbPort,
    database: envConfig.dbName,
    username: envConfig.dbUser,
    password: envConfig.dbPassword,
    logging: (msg) => logger.info(msg)
});

const testPostgresConnection = async () => await retryOperation(
    async () => {
        try {
            await postgresDatabase.authenticate();
            logger.info("Postgres connected successfully");
            await postgresDatabase.sync();
            logger.info("Postgres sync successful");
        } catch (error) {
            logger.error("Error connecting to Postgres", error);
            throw error;
        }
    }
);

export { postgresDatabase, testPostgresConnection };