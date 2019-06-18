const path = require('path');
const fs = require('fs');
const config = require('../config/sizes');
const getLogos = require('../utils/get-logos');
const generateSpec = require('../utils/bubbles-spec');

const {
    CANVAS_WIDTH,
    HEIGHT_START,
    HEIGHT_FINISH,
    RADIUS,
    INITIAL_PADDING,
    PADDING_INCREMENT,
} = config;

const logosDirectoryPath = path.join(__dirname, '../src/assets/logos');
const targetDirectoryPath = path.join(__dirname, '../src');

const generate = async () => {
    const files = await getLogos(logosDirectoryPath);
    const LOGOS_COUNT = files.length;

    const bestSpec = generateSpec({
        CANVAS_WIDTH,
        HEIGHT_START,
        HEIGHT_FINISH,
        LOGOS_COUNT,
        RADIUS,
        INITIAL_PADDING,
        PADDING_INCREMENT,
    });

    const { bubbleSpecs, padding } = bestSpec;

    const spec = [];

    spec.push(`const CANVAS_WIDTH = ${CANVAS_WIDTH};`);
    spec.push(`const RADIUS = ${RADIUS};`);
    spec.push(`const PADDING = ${padding};`);
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
    PADDING,
    bubbleSpecs,
}
`);

    fs.writeFileSync(path.join(targetDirectoryPath, 'spec.js'), spec.join('\n'));
};

generate();
