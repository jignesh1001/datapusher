import redis from "../config/redis.js";

export const cacheMiddleware = (keyPrefix) => async (req, res, next) => {
  const key = `${keyPrefix}:${req.originalUrl}`;
  const cached = await redis.get(key);

  if (cached) {
    return res.json(JSON.parse(cached));
  }

  res.sendResponse = res.json;
  res.json = (body) => {
    redis.set(key, JSON.stringify(body), "EX", 60); // cache for 60 seconds
    res.sendResponse(body);
  };
  next();
};
