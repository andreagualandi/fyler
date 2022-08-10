"use strict";

const Image = require('../libs/Image');
const File = require('../libs/File');

const { PDFDocument } = require('pdf-lib');

const fs = require('fs/promises');
const path = require('path');

async function compress(args) {
    const { files, settings } = args.data;

    await Promise.all(
        files.map(async (file) => {
            const fInfo = await File.getFileInfo(file);

            console.log('Compress:', fInfo.fullName);
            const bytes = await Image.resize(file, settings.newWidth, settings.newHeight);
            await fs.writeFile(path.join(settings.oFolder, `${fInfo.name}_new.jpg`), bytes);
        })
    );
}

async function toPdf(args) {
    const { files, settings } = args.data;
    //execute
    const pdf = await PDFDocument.create()

    //Process images in parallel
    const newImages = await Promise.all(
        files.map(async (item) => {
            //const bytes = await Image.resize(item, 800);
            const bytes = await Image.toBuffer(item);

            return await pdf.embedJpg(bytes);
        })
    );

    //Create pdf with images in the correct order
    newImages.map(image => {
        const { width, height } = image
        const page = pdf.addPage([width, height]);

        page.drawImage(image);
    });

    const pdfBytes = await pdf.save()
    console.log('writing....');
    await fs.writeFile(path.join(settings.oFolder, `${settings.fileName}.pdf`), pdfBytes);
    console.log('done');
}

async function getBlob(args) {
    const { file } = args.data;
    return await Image.toBlob(file);
}

module.exports = { toPdf, compress, getBlob };