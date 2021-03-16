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
    process: (files) => call('api-image', 'process', { files: files }),
}

/*const ffmpeg = {
    getVersion: () => call('api-ffmpeg', 'getVersion'),
    cut: (args) => call('api-ffmpeg', 'cut', args),
} */

const app = {
    getFiles: () => call('api-app', 'getFiles'),
}

export { app, image };