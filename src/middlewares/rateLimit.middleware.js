import rateLimit, { ipKeyGenerator } from "express-rate-limit";

export const createAccountLimiter = rateLimit({
  windowMs: 1000, // 1 second
  max: 5, // limit each account to 5 requests/second
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
  keyGenerator: (req) => req.headers["cl-x-token"] || ipKeyGenerator(req),
  handler: (req, res /*, next*/) => {
    res.status(429).json({
      success: false,
      message: "Too many requests, please try again later.",
    });
  },
});
