import colors from '@jarcher/colors';

export const logRoutes = (prefix, router) => {
    console.log(colors.butterscotch("Routes detected:"));
    router.stack.forEach((layer) => {
        if (layer.route) {
            Object.keys(layer.route.methods).forEach((method) => {
                console.log(`${colors.dustyrose(method.toUpperCase())} ${prefix}${layer.route.path}`);
            });
        }
    });
    console.log();
}