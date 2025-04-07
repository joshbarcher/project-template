import dotenv from 'dotenv';
import find from 'find-process';
import process from 'process';

dotenv.config();
const port = process.env.PRIVATE_PORT;

if (!port) {
    console.error('PORT not defined in .env');
    process.exit(1);
}

find('port', port)
    .then(list => {
        if (!list.length) {
            console.log(`No process found on port ${port}`);
            return;
        }

        for (const proc of list) {
            try {
                process.kill(proc.pid, 'SIGKILL');
                console.log(`Killed process ${proc.pid} (${proc.name}) on port ${port}`);
            } catch (e) {
                console.error(`Failed to kill process ${proc.pid}: ${e.message}`);
            }
        }
    })
    .catch(err => {
        console.error('Error finding process:', err);
    });
