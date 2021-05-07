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

            const bytes = await Image.execute(file, fInfo.mime, 800);
            await fs.writeFile(path.join(settings.oFolder, `${fInfo.name}_${settings.fileSuffix}.${fInfo.ext}`), bytes);
        })
    );
}

async function process(args) {
    const { files, settings } = args.data;
    //execute
    const pdf = await PDFDocument.create()

    //Process images in parallel
    const newImages = await Promise.all(
        files.map(async (item) => {
            const fInfo = await File.getFileInfo(item);
            const bytes = await Image.execute(item, fInfo.mime, 800);

            return fInfo.ext === 'png' ? await pdf.embedPng(bytes) : await pdf.embedJpg(bytes);
        })
    );

    //Create pdf with images in the correct order
    newImages.map(image => {
        //console.log('promise', r)
        const { width, height } = image
        const page = pdf.addPage([width, height]);

        page.drawImage(image);
    });

    const pdfBytes = await pdf.save()
    console.log('writing....');
    await fs.writeFile(path.join(settings.oFolder, `${settings.fileName}.pdf`), pdfBytes);
}

module.exports = { process, compress };