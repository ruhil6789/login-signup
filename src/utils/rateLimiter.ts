import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';
import { ApiError } from './error';
import { CommonMessages, HttpStatusCode } from './constant';


// Define the rate limit options with proper types
const apiLimiter: RateLimitRequestHandler = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 500000, // Limit each IP to 500000 requests per `window` (here, per 1 minute)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers,
    handler: (req, res, next) => {
        next(new ApiError(CommonMessages.API_RATE_LIMIT_ERROR, true, HttpStatusCode.RATE_LIMIT));
    },
});

// Apply the rate limiting middleware to API calls only
export default apiLimiter;
