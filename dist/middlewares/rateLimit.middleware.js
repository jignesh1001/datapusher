import rateLimit, { ipKeyGenerator } from "express-rate-limit";
export const createAccountLimiter = rateLimit({
    windowMs: 1000, // 1 second
    max: 5, // limit each account to 5 requests/second
    message: {
        success: false,
        message: "Too many requests, please try again later.",
    },
    keyGenerator: (req) => {
        const token = req.headers["cl-x-token"];
        const resolvedToken = Array.isArray(token) ? token[0] : token;
        if (resolvedToken)
            return resolvedToken;
        return ipKeyGenerator(req);
    },
    handler: (_req, res) => {
        res.status(429).json({
            success: false,
            message: "Too many requests, please try again later.",
        });
    },
});
