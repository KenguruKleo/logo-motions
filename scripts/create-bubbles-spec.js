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

const getCandidateSpec = ({ LOGOS_COUNT }) => {
    return generateSpec({
        CANVAS_WIDTH,
        HEIGHT_START,
        HEIGHT_FINISH,
        LOGOS_COUNT,
        RADIUS,
        INITIAL_PADDING,
        PADDING_INCREMENT,
    });
};

const generate = async () => {
    const files = await getLogos(logosDirectoryPath);
    const LOGOS_COUNT = files.length;

    const options = { LOGOS_COUNT };

    let bestSpec = getCandidateSpec(options);
    console.log(bestSpec.padding, bestSpec.protect);

    for (let i = 0; i < 1000; i++) {
        const nextSpec = getCandidateSpec(options);
        if (nextSpec.padding > bestSpec.padding) {
            bestSpec = nextSpec;
            console.log(bestSpec.padding, bestSpec.protect);
        }
    }

    const bubbleSpecs = bestSpec.bubbleSpecs;

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
};

generate();
