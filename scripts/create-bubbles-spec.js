const path = require('path');
const fs = require('fs');

const generateSpec = require('../utils/bubbles-spec');

const directoryPath = path.join(__dirname, '../raw-logos');
const targetDirectoryPath = path.join(__dirname, '../src');

const CANVAS_WIDTH = 2800;
const HEIGHT_START = 38;
const HEIGHT_FINISH = 385;
const LOGOS_COUNT = 43;
const RADIUS = 76;
const INITIAL_PADDING = 5;
const PADDING_INCREMENT = 2;

const bubbleSpecs = generateSpec({
    CANVAS_WIDTH,
    HEIGHT_START,
    HEIGHT_FINISH,
    LOGOS_COUNT,
    RADIUS,
    INITIAL_PADDING,
    PADDING_INCREMENT,
}).bubbleSpecs;

console.log(bubbleSpecs);

const spec = [];

spec.push(`const CANVAS_WIDTH = ${CANVAS_WIDTH};`);
spec.push(`const RADIUS = ${RADIUS};`);
spec.push('');

spec.push(`const bubbleSpecs = [`);
bubbleSpecs.forEach(({ x, y, s }) => {
    spec.push(`    { x: ${x}, y: ${y}, s: ${s} },`);
});
spec.push('];');

spec.push('');
spec.push(`
export {
    CANVAS_WIDTH,
    RADIUS,
    bubbleSpecs,
}
`);

fs.writeFileSync(path.join(targetDirectoryPath, 'spec.js'), spec.join('\n'));
