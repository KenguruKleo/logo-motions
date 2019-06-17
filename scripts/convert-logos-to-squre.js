const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const getLogos = require('../utils/get-logos');
const config = require('../config/sizes');

const {
    LOGO_WIDTH_IN_STRIPE,
} = config;

const directoryPath = path.join(__dirname, '../raw-logos');
const targetDirectoryPath = path.join(__dirname, '../src/assets');

getLogos(directoryPath)
    .then(files => {
        files
            .forEach(file => {
                console.log(file);
                sharp(file.fullPath)
                    .resize(LOGO_WIDTH_IN_STRIPE, LOGO_WIDTH_IN_STRIPE)
                    .toFile(path.join(targetDirectoryPath, 'logos', file.fileName));

            })
    });
