import '@jarcher/loggem';
import colors from '@jarcher/colors';
import { shutdown } from './controllers/server.controller.js';
import app from './app.js';

const { PORT } = process.env;
const server = app.listen(PORT, () => {
    console.log(`Server started on ${colors.magenta(`http://localhost:${PORT}`)}\n`);
});

process.on("SIGINT", shutdown(server));