
export const notFound = (req, res) => {
    //get path of uri
    console.error(`Missing path: ${req.url}`);
    res.render("error", {
        status: 404,
        message: "Page not found!"
    });
}

export const shutdown = server => {
    return () => {
        console.log("Shutting down gracefully...");
    
        server.close(() => {
            console.log("Server closed. Shutting down process");
            process.exit(0);
        })
    }
}

export const requestLogger = (req, res, next) => {
    const { method, url, headers, ip } = req;
    const timestamp = new Date().toISOString();

    const logEntry = `[${timestamp}] ${method} ${url} - IP: ${ip}, User-Agent: ${headers['user-agent']}\n`;

    // Log to console
    console.log(chalk.orlogEntry.trim());

    // Append log entry to file
    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });

    next();
}