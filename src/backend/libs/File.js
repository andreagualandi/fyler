'use strict';

const FileType = require('file-type');
const path = require('path');

async function getFileInfo(file) {
    const info = await FileType.fromFile(file);
    //const fileName = path.basename(item, ext) //notes
    return {
        fileName: path.basename(file), //file.jpg
        filePath: path.dirname(file),
        ...info //ext: jpg, mime: image/jpeg
    };
}

module.exports = { getFileInfo };