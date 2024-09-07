import { Request, Response, NextFunction } from "express";
import logger from "../../config/logging/winston.config";
import { redisClient } from "../../config/cache/cache.config";

const cacheMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const cacheKey = `cache:${req.originalUrl}`;

    try {
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            logger.info(`Cache hit for ${cacheKey}`);
            return res.status(200).json(JSON.parse(cachedData));
        }

        // Flag para evitar establecer la caché más de una vez
        let cacheSet = false;

        // Función para establecer la caché
        const setCacheIfNeeded = (body: any) => {
            if (!cacheSet && res.statusCode >= 200 && res.statusCode < 300) {
                const dataToCache =
                    typeof body === "string" ? body : JSON.stringify(body);
                redisClient.set(cacheKey, dataToCache, {
                    EX: 60 * 10, // Expiración de 10 minutos
                });
                logger.info(`Cache set for ${cacheKey}`);
                cacheSet = true;
            }
        };

        // Modificamos el objeto res para interceptar la respuesta
        const originalJson = res.json;
        const originalSend = res.send;

        res.json = function (body: any) {
            setCacheIfNeeded(body);
            return originalJson.call(this, body);
        };

        res.send = function (body: any) {
            setCacheIfNeeded(body);
            return originalSend.call(this, body);
        };

        next();
    } catch (error) {
        logger.error("Error in cache middleware:", error);
        next();
    }
}

export default cacheMiddleware;