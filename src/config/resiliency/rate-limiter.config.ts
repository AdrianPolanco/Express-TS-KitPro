import rateLimit from "express-rate-limit";

const rateLimiterConfig = {
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try later.",
};

const rateLimiter = rateLimit(rateLimiterConfig);

export default rateLimiter;