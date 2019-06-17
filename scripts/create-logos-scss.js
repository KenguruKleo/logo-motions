const path = require('path');
const fs = require('fs');
const getLogos = require('../utils/get-logos');
const config = require('../config/sizes');

const {
    LOGO_WIDTH_IN_STRIPE,
    RADIUS,
} = config;

const directoryPath = path.join(__dirname, '../src/assets/logos');
const targetDirectoryPath = path.join(__dirname, '../src/assets');

getLogos(directoryPath)
    .then(files => {
       const logosStyle = files
           .map((file, index) => (
`.logo${index + 1} {
    background-position-x: nth($${file.fileNameWithoutExt}, 3) * $ratio;
    background-position-y: nth($${file.fileNameWithoutExt}, 4) * $ratio;
}`
           ))
           .join('\n');

        fs.writeFileSync(path.join(targetDirectoryPath, 'logos.scss'), logosStyle);
    })
    .catch(err => console.error(err));

const logosVariables = [];

logosVariables.push(`$actual-logo-width: ${LOGO_WIDTH_IN_STRIPE}px;`);
logosVariables.push(`$logo-width: ${RADIUS * 2}px;`);
logosVariables.push('$logo-height: $logo-width;');
logosVariables.push('');

logosVariables.push('$ratio: $logo-width / $actual-logo-width;');
logosVariables.push('');

fs.writeFileSync(path.join(targetDirectoryPath, 'logos-variables.scss'), logosVariables.join('\n'));
