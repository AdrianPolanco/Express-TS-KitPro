import app, { initializeInfrastructure } from "./server";
import envConfig from "./config/env/env.config";
import logger from "./config/logging/winston.config";

initializeInfrastructure();

app.listen(envConfig.port, () => {
    logger.info(`Server is running on port ${envConfig.port}`);
});