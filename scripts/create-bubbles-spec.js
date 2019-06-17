const path = require('path');
const fs = require('fs');
const config = require('../config/sizes');
const generateSpec = require('../utils/bubbles-spec');

const {
    CANVAS_WIDTH,
    HEIGHT_START,
    HEIGHT_FINISH,
    LOGOS_COUNT,
    RADIUS,
    INITIAL_PADDING,
    PADDING_INCREMENT,
} = config;

const logosDirectoryPath = path.join(__dirname, '../src/assets/logos');
const targetDirectoryPath = path.join(__dirname, '../src');

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
