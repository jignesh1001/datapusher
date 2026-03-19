import redis from "../config/redis.js";
export const cacheMiddleware = (keyPrefix) => async (req, res, next) => {
    const key = `${keyPrefix}:${req.originalUrl}`;
    const cached = await redis.get(key);
    if (cached) {
        res.json(JSON.parse(cached));
        return;
    }
    const originalJson = res.json.bind(res);
    res.json = (body) => {
        redis.set(key, JSON.stringify(body), { EX: 60 });
        return originalJson(body);
    };
    next();
};
