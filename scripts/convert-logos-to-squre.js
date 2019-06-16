const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const directoryPath = path.join(__dirname, '../raw-logos');
const targetDirectoryPath = path.join(__dirname, '../src/assets');

fs.readdir(directoryPath, (err, files) => {
    files
        .map(file => ({
            fileName: file,
            fullPath: path.join(directoryPath, file),
        }))
        .filter(file => !fs.statSync(file.fullPath).isDirectory())
        .filter(file => (/.*\.png$/).test(file.fileName))
        .forEach(file => {
            console.log(file);
            sharp(file.fullPath)
                .resize(152, 152)
                .toFile(path.join(targetDirectoryPath, 'logos', file.fileName));

        })
});
