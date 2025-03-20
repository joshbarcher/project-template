import tracer from 'tracer';
import chalk from './chalk.js';
import fs from 'fs';
import stripAnsi from 'strip-ansi';

export const logger = tracer.console({
    format: `${chalk.green("{{file}}:{{line}} -")} {{message}}`,
    transport: (data) => {
        console.log(data.output);
        fs.appendFileSync('server.log', stripAnsi(data.output) + '\n', 'utf8');
    }
});

const blankLineLogger = tracer.console({
    format: "",
    transport: (data) => {
        console.log();
        fs.appendFileSync('server.log', '\n', 'utf8');
    }
});

export const blankLine = () => {
    blankLineLogger.log();
}