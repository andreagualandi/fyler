'use strict';
const sharp = require('sharp');

class Image {
    constructor() {
        this.file = null;
        this.image = null;
    }

    async toBlob(file) {
        const buff = await sharp(file)
            .resize({ width: 400 })
            .toFormat('jpeg')
            .toBuffer();
        return 'data:image/jpeg;base64,' + buff.toString('base64');
    }

    async resize(file, width = null, height = null) {
        return await sharp(file)
            .resize({
                width: width,
                height: height,
                fit: sharp.fit.contain,
                //position: sharp.strategy.entropy
                withoutEnlargement: true,
                background: { r: 255, g: 255, b: 255 }
            })
            .toFormat('jpeg')
            .toBuffer();
    }
}

/* 
const jimp = require('jimp');

class Image {
    constructor() {
        this.file = null;
        this.image = null;
        this.commands = [];
    }

    async execute(file, mimeType, w = null, h = null) {
        let image = null;
        let bytes = null;
        // Read the image.
        image = await jimp.read(file);

        if (w) {
            // Resize the image to width and auto height.
            h = h || jimp.AUTO;
            await image.resize(w, h);
        }
        // Save and overwrite the image
        return image.getBufferAsync(mimeType);
        //await image.writeAsync(newPath);
    }
}


 */

module.exports = new Image();