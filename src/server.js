import '@jarcher/loggem';
import chalk from '@jarcher/enhanced-chalk';
import { shutdown } from './controllers/server.controller.js';
import app from './app.js';

const { PORT } = process.env;
const server = app.listen(PORT, () => {
    console.log(`Server started on port ${chalk.magenta(PORT)}\n`);
});

process.on("SIGINT", shutdown(server));