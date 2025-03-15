import { logger, blankLine } from './debug.js';

export const logRoutes = (router) => {
    logger.log("Routes detected:");
    router.stack.forEach((layer) => {
        if (layer.route) {
            Object.keys(layer.route.methods).forEach((method) => {
                console.log(`${method.toUpperCase()} ${layer.route.path}`);
            });
        }
    });
    blankLine();
}