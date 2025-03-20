import chalk from 'chalk';
import colors from './colors.js';

// Object to store dynamically added colors
const customColors = {};

// Extend chalk with named color functions
const enhancedChalk = Object.create(chalk);

// Attach predefined named colors
for (const [color, [r, g, b]] of Object.entries(colors)) {
    enhancedChalk[color] = (text) => chalk.rgb(r, g, b)(text);
}

// Wrapper for chalk.rgb()
enhancedChalk.tint = (r, g, b, text) => chalk.rgb(r, g, b)(text);

// Function to register a custom color
enhancedChalk.registerColor = (name, r, g, b) => {
    customColors[name] = [r, g, b];
    enhancedChalk[name] = (text) => chalk.rgb(r, g, b)(text);
};

// Function to retrieve a registered color
enhancedChalk.getColor = (name, text) => {
    if (customColors[name]) {
        const [r, g, b] = customColors[name];
        return chalk.rgb(r, g, b)(text);
    }
    return chalk.gray(`Color "${name}" not found`);
};

//print colors available
enhancedChalk.toString = function() {
    return Object.keys(namedColors).map(color => `chalk.${color}()`).join('\n');
};

export default enhancedChalk;
