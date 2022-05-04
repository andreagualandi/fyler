'use strict';

const mime = require('mime-types');
const path = require('path');

async function getFileInfo(file) {
    const mime = getFileMimeType(file);
    const fileInfo = path.parse(file);

    return {
        fullName: fileInfo.base, //file.jpg
        name: fileInfo.name,//file
        path: path.dirname(file),
        ext: fileInfo.ext, //.jpg
        mime: mime //ext: jpg, mime: image/jpeg
    };
}

function getFileMimeType(file) {
    return mime.lookup(file);
}

module.exports = { getFileInfo };