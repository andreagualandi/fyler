const { ipcRenderer } = window.electron;

async function call(endpoint, action, data = {}) {
    try {
        return await ipcRenderer.invoke(endpoint, { action, data });
    } catch (e) {
        console.error('Api call failed', e);
        return null;
    }
}

const image = {
    process: (files, settings) => call('api-image', 'process', { files: files, settings: settings }),
    compress: (files, settings) => call('api-image', 'compress', { files: files, settings: settings }),
}

const app = {
    getFiles: () => call('api-app', 'getFiles'),
    getFolder: () => call('api-app', 'getFolder'),
}

export { app, image };