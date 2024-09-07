import dotenv from 'dotenv';

dotenv.config();

const envConfig = {
    port: Number(process.env.PORT) || 3000,
    dbHost: process.env.POSTGRES_DB_HOST as string,
    dbPort: Number(process.env.POSTGRES_DB_PORT as string),
    dbName: process.env.POSTGRES_DB_NAME as string,
    dbUser: process.env.POSTGRES_DB_USER as string,
    dbPassword: process.env.POSTGRES_DB_PASSWORD as string,
    mongoUri: process.env.MONGO_URI as string,
    saltRounds: Number(process.env.SALT_ROUNDS as string),
    jwtSecret: process.env.JWT_SECRET as string,
    redisUrl: process.env.REDIS_URL as string
};

export default envConfig;