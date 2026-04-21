import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 120,
    handler: function(req, res, next) {
        const error = new Error('Too many requests. Try Again later.');
        error.status = 429;
        next(error);
    },
});