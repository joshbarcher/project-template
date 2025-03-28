import fs from 'fs';
import path from 'path';
import lcovParse from 'lcov-parse';

// Paths
const lcovPath = path.resolve('coverage/lcov.info');
const outputPath = path.resolve('public/coverage-summary.json');


// Utility: Ensure build directory exists
fs.mkdirSync(path.dirname(outputPath), { recursive: true });

// Utility: Choose badge color by coverage %
function getColor(percentage) {
    if (percentage >= 90) return 'green';
    if (percentage >= 75) return 'yellow';
    if (percentage >= 50) return 'orange';
    return 'red';
}

// Parse lcov and generate badge JSON
lcovParse(lcovPath, (err, data) => {
    if (err) {
        console.error('❌ Failed to parse lcov.info:', err);
        process.exit(1);
    }

    const total = data.reduce(
        (acc, file) => {
            acc.lines.found += file.lines.found;
            acc.lines.hit += file.lines.hit;
            return acc;
        },
        { lines: { found: 0, hit: 0 } }
    );

    if (total.lines.found === 0) {
        console.warn('⚠️ No lines found in lcov report.');
        process.exit(1);
    }

    const percentage = ((total.lines.hit / total.lines.found) * 100).toFixed(1);
    const badge = {
        schemaVersion: 1,
        label: 'coverage',
        message: `${percentage}%`,
        color: getColor(percentage)
    };

    fs.writeFileSync(outputPath, JSON.stringify(badge, null, 2));
    console.log(`✅ Coverage badge written to ${outputPath} (${percentage}%)`);
});
