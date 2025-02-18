import tracer from 'tracer';
import chalk from 'chalk';

export const logger = tracer.console({
    format: `${chalk.green("{{file}}:{{line}} -")} {{message}}`
});

const blankLineLogger = tracer.console({
    format: ""
});

export const blankLine = () => {
    blankLineLogger.log();
}