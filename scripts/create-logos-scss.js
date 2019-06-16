const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname, '../raw-logos');
const targetDirectoryPath = path.join(__dirname, '../src/assets');

fs.readdir(directoryPath, (err, files) => {
    const logosStyle = files
        .map(file => ({
            fileName: file,
            fullPath: path.join(directoryPath, file),
            fileNameWithoutExt: file.match(/(.*)\..*$/)[1],
        }))
        .filter(file => !fs.statSync(file.fullPath).isDirectory())
        .filter(file => (/.*\.png$/).test(file.fileName))
        .map((file, index) => (
`.logo${index + 1} {
    @include sprite($${file.fileNameWithoutExt});
}`
        ))
        .join('\n');

    fs.writeFileSync(path.join(targetDirectoryPath, 'logos.scss'), logosStyle);
});
