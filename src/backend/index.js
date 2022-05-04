"use strict";

const ipc = require('electron').ipcMain

const ImageController = require('./controllers/ImageController');
const AppController = require('./controllers/AppController');

const routes = {
    image: ImageController,
    app: AppController
};

async function imageRoute(event, args) {
    try {
        return await routes.image[args.action](args)
    } catch (e) {
        console.error('image - Error:', e);
        return null;
    }
}

async function appRoute(event, args) {
    try {
        return await routes.app[args.action](args)
    } catch (e) {
        console.error('APP - Error:', e);
        return null;
    }
}

ipc.handle('api-image', imageRoute);
ipc.handle('api-app', appRoute);