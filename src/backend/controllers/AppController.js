'use strict';

const { app, dialog } = require('electron');
const path = require('path');

function getDownloadPath(args) {
    const dir = app.getPath('downloads');
    return path.join(dir, args.data.fileName);
}


async function getFiles(args) {
    const response = await dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] });
    return response.filePaths;
}

module.exports = { getDownloadPath, getFiles };