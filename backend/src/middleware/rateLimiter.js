import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

dotenv.config();

// NOTE: Load rate limit configuration from environment variables
// WINDOW_MS = time window in milliseconds (e.g., 1000 = 1 second)
// RATE_LIMIT = maximum number of requests allowed per IP in that time window
const WINDOW_MS = Number(process.env.WINDOW_MS) || 1000;
const LIMIT = Number(process.env.RATE_LIMIT) || 100;

// Fixed window approach using HashMap { ip: { count: number, windowStart: number } }
const buckets = new Map();

// Cleanup expired buckets to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [ip, bucket] of buckets) {
    if (now - bucket.windowStart > WINDOW_MS) {
      buckets.delete(ip);
    }
  }
}, WINDOW_MS);

export const rateLimiter = (req, res, next) => {
  const now = Date.now();
  const ip = req.ip || req.connection?.remoteAddress || 'unknown';

  let bucket = buckets.get(ip);

  if (!bucket || now - bucket.windowStart >= WINDOW_MS) {
    bucket = { count: 0, windowStart: now };
    buckets.set(ip, bucket);
  }

  bucket.count += 1;

  const resetInMs = WINDOW_MS - (now - bucket.windowStart);
  const resetAt = Math.ceil((now + Math.max(resetInMs, 0)) / 1000);
  const remaining = Math.max(LIMIT - bucket.count, 0);

  // NOTE: Rate limit headers
  res.setHeader('X-RateLimit-Limit', String(LIMIT));
  res.setHeader('X-RateLimit-Remaining', String(remaining));
  res.setHeader('X-RateLimit-Reset', String(resetAt));

  if (bucket.count > LIMIT) {
    // rejecting the requests of people who abuse the ratelimts
    res.setHeader('Retry-After', String(Math.ceil(resetInMs / 1000)));
    return res.status(429).json({
      success: false,
      status: 429,
      message:
        'Rate limit exceeded: max 100 requests per second. Please slow down boi, cache responses where possible, and retry after the reset window.',
      meta: {
        timestamp: new Date().toISOString(),
      },
    });
  }

  next();
};

export default rateLimiter;

// NOTE: Generic configuration for APIs
export const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // max requests per IP
  message: { message: 'Too many requests, please try again later.' },
});

// NOTE: Dedicated configuration only for authentication endpoints
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // stricter limit for login to prevent brute force
  message: { message: 'Too many login attempts, please try again later.' },
});

// NOTE: Contact form rate limiter
export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15-minute window
  max: 20, // limit each IP to 20 requests per window
  standardHeaders: true, // send rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // disable the `X-RateLimit-*` headers
  message: {
    success: false,
    status: 429,
    message: 'Too many contact requests. Please try again later.',
  },
});
