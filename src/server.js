import express from 'express';
import { rateLimit } from 'express-rate-limit';
import session from 'express-session';
import chalk from 'chalk';
import { logger, blankLine } from './utility/debug.js';

//configure Express.js app
const app = express();

app.set("view engine", "pug");
app.set("views", "src/views");

//sessions
app.use(session({
    secret: "b798458a-9bb9-41c1-a44c-16868147874c",
    resave: false,
    saveUninitialized: true
}))

//rate limiting
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
app.use(limiter);

//public resources
app.use(express.static("public"));

//mount routers...

//undefined routes
app.use((req, res) => {
    //get path of uri
    logger.error(`Missing path: ${req.url}`);
    res.redirect('/?error=404');
})

const PORT = 3000;
const server = app.listen(PORT, () => {
    logger.log(`Server started on port ${chalk.magenta(PORT)}`);
    blankLine();
});

process.on("SIGINT", () => {
    logger.log("Shutting down gracefully...");

    server.close(() => {
        logger.log("Server closed. Shutting down process");
        process.exit(0);
    })
})