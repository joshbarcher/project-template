import { logger, blankLine } from './debug.js';
import chalk from './chalk.js';

export const logRoutes = (prefix, router) => {
    logger.log(chalk.khaki("Routes detected:"));
    router.stack.forEach((layer) => {
        if (layer.route) {
            Object.keys(layer.route.methods).forEach((method) => {
                logger.log(`${method.toUpperCase()} ${prefix}${layer.route.path}`);
            });
        }
    });
    blankLine();
}