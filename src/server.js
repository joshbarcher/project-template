import express from 'express';
import session from 'express-session';
import chalk from '@jarcher/enhanced-chalk';
import { logger, blankLine } from '@jarcher/loggem';
import dotenv from 'dotenv';
import limiter from './config/rate-limit.config.js';
import sessionConfig from './config/session.config.js';
import { notFound, shutdown, requestLogger } from './controllers/server.controller.js';
import router from './routes/routes.js';
import { logRoutes } from './utility/server.js';

//environment variables
dotenv.config({ path: 'config.env' });

//configure Express.js app
const app = express();

//view engine
app.set("view engine", "pug");
app.set("views", "src/views");

//middleware
app.use(requestLogger);
app.use(session(sessionConfig))
app.use(limiter);
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

//mount routers...
app.use(router);
logRoutes("/", router);

//undefined routes
app.use(notFound)

const { PORT } = process.env;
const server = app.listen(PORT, () => {
    logger.log(`Server started on port ${chalk.magenta(PORT)}\n`);
});

process.on("SIGINT", shutdown(server));