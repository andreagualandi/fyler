'use strict';

const { app, dialog } = require('electron');
const path = require('path');

function getDownloadPath(args) {
    const dir = app.getPath('downloads');
    return typeof args.data.fileName === "string" ? path.join(dir, args.data.fileName) : dir;
}

async function getFiles(args) {
    const response = await dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] });
    return response.filePaths;
}

async function getFolder(args) {
    const response = await dialog.showOpenDialog({ properties: ['openDirectory'] });
    return !response.canceled ? response.filePaths[0] : '';
}


async function showSaveDialog(args) {
    const dir = app.getPath('downloads');
    return dialog.showSaveDialog({
        defaultPath: dir
    })
}

module.exports = { getDownloadPath, showSaveDialog, getFiles, getFolder };