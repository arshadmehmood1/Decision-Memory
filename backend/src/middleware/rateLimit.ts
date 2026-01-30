import rateLimit from 'express-rate-limit';

// Standard API limiter: 100 requests per 15 minutes
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
        success: false,
        error: {
            message: 'Too many requests, please try again later.',
            code: 'RATE_LIMIT_EXCEEDED'
        }
    }
});

// Strict limiter for sensitive write operations (create decision, delete): 20 requests per hour
export const strictLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        error: {
            message: 'Too many write requests, please try again later.',
            code: 'RATE_LIMIT_EXCEEDED'
        }
    }
});
