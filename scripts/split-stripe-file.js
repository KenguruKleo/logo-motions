const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const imgSize = 304;
const padding = 4;

const targetDirectoryPath = path.join(__dirname, '../raw-logos');

const sourceImg = sharp( path.join(__dirname, './stripe-logo-bubbles-spritesheet.png'));

for (let row = 0; row < 7; row ++) {
    for (let col = 0; col < 7; col ++) {
        const inx = row * 7 + col + 1;
        const fileName = `logo-${inx}.png`;

        const trimOptions = {
            top: row * imgSize + (row ? row * padding : 0),
            left: col * imgSize + (col ? col * padding : 0),
            width: imgSize,
            height: imgSize,
        };
        console.log(trimOptions);

        sourceImg.clone()
            .extract(trimOptions)
            .toFile(path.join(targetDirectoryPath, fileName));
    }
}
