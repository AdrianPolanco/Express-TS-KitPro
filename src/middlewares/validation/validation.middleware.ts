import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import logger from "../../config/logging/winston.config";
import { log } from "winston";

const validationMiddleware = (schema: ObjectSchema) => { 
    return (req: Request, res: Response, next: NextFunction) => { 
        const startTime = Date.now();
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const duration = Date.now() - startTime;
            logger.error(`Validation failed for request ${req.method} ${req.originalUrl} - Duration: ${duration}ms`);
            logger.error(`Validation details: ${JSON.stringify(error.details.map((err) => err.message))}`);

           return res.status(400).json({
               message: "Validation error",
               details: error.details.map((err) => err.message),
           });    
        }

        const duration = Date.now() - startTime;
        logger.info(`Validation passed for request ${req.method} ${req.originalUrl} - Duration: ${duration}ms`);
        next();
    }
}

export default validationMiddleware;