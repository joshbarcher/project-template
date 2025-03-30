import express from 'express';
import session from 'express-session';
import '@jarcher/loggem';
import dotenv from 'dotenv';
import limiter from './config/rate-limit.config.js';
import sessionConfig from './config/session.config.js';
import { notFound, requestLogger } from './controllers/server.controller.js';
import router from './routes/default.routes.js';
import { logRoutes } from './utility/server.util.js';

//before server creation
console.config({ includeTimestamp: false })
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
app.use("/coverage", express.static("coverage/lcov-report"));
app.use(express.urlencoded({extended: true}));

//mount routers...
app.use(router);
logRoutes("", router);

//undefined routes
app.use(notFound)

export default app;