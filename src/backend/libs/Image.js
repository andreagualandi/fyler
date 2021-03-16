'use strict';

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


module.exports = new Image();