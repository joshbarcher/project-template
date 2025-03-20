import { rateLimit } from 'express-rate-limit';

//15 minutes
const MILLIS = 1000;
const SECONDS = 60;
const MINUTES = 15;

const limiter = rateLimit({
    windowMs: MINUTES * SECONDS * MILLIS,
    limit: 1500,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: "Too many requests. Try again later."
})

export default limiter;