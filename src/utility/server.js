import chalk from '@jarcher/enhanced-chalk';

export const logRoutes = (prefix, router) => {
    console.log(chalk.khaki("Routes detected:"));
    router.stack.forEach((layer) => {
        if (layer.route) {
            Object.keys(layer.route.methods).forEach((method) => {
                console.log(`${method.toUpperCase()} ${prefix}${layer.route.path}`);
            });
        }
    });
}