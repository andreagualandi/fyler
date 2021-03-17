"use strict";

const ipc = require('electron').ipcMain

const { process } = require('./controllers/ImageController');
//const { getVersion, cut } = require('./controllers/PdfController'); 
const { getFiles, getFolder } = require('./controllers/AppController');

const routes = {
    image: {
        process: process,
    },
    /*pdf: {
        getVersion: getVersion,
        cut: cut,
    }, */
    app: {
        getFiles: getFiles,
        getFolder: getFolder,
    }
};

async function imageRoute(event, args) {
    try {
        return await routes.image[args.action](args)
    } catch (e) {
        console.error('image - Error:', e);
        return null;
    }
}
/*
async function pdfRoute(event, args) {
    try {
        return await routes.pdf[args.action](args)
    } catch (e) {
        console.error('pdf - Error:', e);
        return null;
    }
} */

async function appRoute(event, args) {
    try {
        return await routes.app[args.action](args)
    } catch (e) {
        console.error('APP - Error:', e);
        return null;
    }
}

ipc.handle('api-image', imageRoute);
//ipc.handle('api-pdf', pdfRoute);
ipc.handle('api-app', appRoute);