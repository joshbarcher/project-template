import '@jarcher/loggem';
import colors from '@jarcher/colors';
import { shutdown } from './controllers/server.controller.js';
import app from './app.js';

const { PORT } = process.env;
const server = app.listen(PORT, () => {
    console.log(`Server started on port ${colors.magenta(PORT)}\n`);
});

process.on("SIGINT", shutdown(server));