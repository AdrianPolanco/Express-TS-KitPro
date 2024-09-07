import { Request, Response, NextFunction } from "express";
import logger from "../../config/logging/winston.config";

const requestLoggerMiddleware = (req: Request, res: Response, next: NextFunction) => { 
    const startTime = Date.now();

    logger.info(`Incoming request: ${req.method} ${req.originalUrl}`);

    res.on("finish", () => {
        const duration = Date.now() - startTime;
        logger.info(`Request processed: ${req.method} ${req.originalUrl} - Status: ${res.statusCode} - Duration: ${duration}ms`);
    });

    next();
}

export default requestLoggerMiddleware;