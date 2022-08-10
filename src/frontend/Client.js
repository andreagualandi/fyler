let progressCallback;

window.onmessage = (event) => {
    console.log('evento renderer', event);
    // event.source === window means the message is coming from the preload
    // script, as opposed to from an <iframe> or other source.
    if (event.source === window && event.data === 'main-world-port') {
        const [port] = event.ports
        // Once we have the port, we can communicate directly with the main
        // process.
        port.onmessage = (event) => {
            console.log('from main process:', event.data);
            progressCallback(event.data);
            //port.postMessage(event.data * 2)
        }
        port.onclose = () => {
            console.log('stream ended')
        }
    }
}

async function call(endpoint, action, data = {}) {
    try {
        return await window.api.invoke(endpoint, { action, data });
    } catch (e) {
        console.error('Api call failed', e);
        return null;
    }
}

const image = {
    toPdf: (files, settings) => call('api-image', 'toPdf', { files: files, settings: settings }),
    compress: (files, settings) => call('api-image', 'compress', { files: files, settings: settings }),
    getBlob: (file, settings) => call('api-image', 'getBlob', { file: file, settings: settings })
}

const app = {
    getDownloadPath: (fileName) => call('api-app', 'getDownloadPath', { fileName }),
    showSaveDialog: () => call('api-app', 'showSaveDialog'),
    getFiles: () => call('api-app', 'getFiles'),
    getFolder: () => call('api-app', 'getFolder'),
}

export { image, app };