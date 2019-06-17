const path = require('path');
const fs = require('fs');

const getLogos = (directoryPath, options = {}) => {
    const {} = options;

    return new Promise((resolve, reject) => {
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                reject(err);
                return;
            }
            const res = files
                .map(file => ({
                    fileName: file,
                    fullPath: path.join(directoryPath, file),
                    fileNameWithoutExt: file.match(/(.*)\..*$/)[1],
                }))
                .filter(file => !fs.statSync(file.fullPath).isDirectory())
                .filter(file => (/.*\.png$/).test(file.fileName));
            resolve(res);
        });
    });
};

module.exports = getLogos;
