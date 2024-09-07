import envConfig from '../config/env/env.config';
import logger from '../config/logging/winston.config';
import jwt from 'jsonwebtoken';
const generateToken = (id: string): string => {
    return jwt.sign({ id }, envConfig.jwtSecret, {
        expiresIn: "10m"
    })
}

//This function is used to verify the token outside the context of a protected route using the passport middleware
const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, envConfig.jwtSecret);
    } catch (error) {
        logger.error(error);
    }
}

export { generateToken, verifyToken };