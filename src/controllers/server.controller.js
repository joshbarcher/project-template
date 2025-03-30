import fs from 'fs';
import path from 'path';

const logFilePath = './server.log';

export const codeCoverage = (req, res) => {
    const filePath = path.join(process.cwd(), '/coverage/lcov-report/index.html');
    res.sendFile(filePath);
}

export const notFound = (req, res) => {
    //get path of uri
    console.error(`Missing path: ${req.url}`);
    res.render("error", {
        status: 404,
        message: "Page not found!"
    });
}

export const shutdown = server => () => {
    console.log("Shutting down gracefully...");

    server.close(() => {
        console.log("Server closed. Shutting down process");
        process.exit(0);
    })
}

export const requestLogger = (req, res, next) => {
    const { method, url } = req;
    const timestamp = new Date().toISOString();

    const logEntry = `[${timestamp}] ${method} ${url}\n`;

    // Log to console
    console.log(logEntry.trim());

    // Append log entry to file
    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });

    next();
}