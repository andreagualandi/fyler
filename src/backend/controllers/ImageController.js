"use strict";

const Image = require('../libs/Image');
const File = require('../libs/File');

const { PDFDocument } = require('pdf-lib');

const fs = require('fs');

const path = require('path');

const { app } = require('electron');

async function process(args) {

    const pdf = await PDFDocument.create()

    const { files } = args.data;
    console.log(files);

    const dir = app.getPath('downloads');

    await Promise.all(
        files.map(async (item) => {
            const info = await File.getFileInfo(item);

            const newPath = path.join(dir, info.fileName);
            console.log('resize', item, 'to', newPath);

            const bytes = await Image.execute(item, info.mime, 800);

            const img = info.ext === 'png' ? await pdf.embedPng(bytes) : await pdf.embedJpg(bytes);
            const { width, height } = img
            const page = pdf.addPage([width, height]);

            page.drawImage(img);
        })
    );

    const pdfBytes = await pdf.save()
    console.log('writing....');
    fs.writeFileSync(path.join(dir, 'out.pdf'), pdfBytes);
}

module.exports = { process };