'use strict';

const FileType = require('file-type');
const path = require('path');

async function getFileInfo(file) {
    const info = await FileType.fromFile(file);

    return {
        fullName: path.basename(file), //file.jpg
        name: path.basename(file, info.ext),//file
        path: path.dirname(file),
        ...info //ext: jpg, mime: image/jpeg
    };
}

module.exports = { getFileInfo };