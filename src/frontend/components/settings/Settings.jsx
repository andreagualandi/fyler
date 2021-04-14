import React, { useCallback, useState, useEffect } from "react";
import { app } from '../../Client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faPlay } from '@fortawesome/free-solid-svg-icons'

import './settings.less';

export default function settings({ onSubmitCallback, data }) {
    const [outFolder, setOutFolder] = useState('');
    const onChangeOutFolder = useCallback((e) => setOutFolder(e.target.value), [setOutFolder]);

    const [fileName, setFileName] = useState('');
    const onChangeFileName = useCallback((e) => setFileName(e.target.value), [setFileName]);

    const [fileSuffix, setFileSuffix] = useState('');
    const onChangeFileSuffix = useCallback((e) => setFileSuffix(e.target.value), [setFileSuffix]);

    const [exportMode, setExportMode] = useState('single');
    const onChangeExportMode = useCallback((mode) => () => setExportMode(mode), [setExportMode]);

    const [fileType, setFileType] = useState('pdf');
    const onChangeFileType = useCallback((e) => setFileType(e.target.value), [setFileType]);


    const handleClickFolderSelector = useCallback(async (e) => {
        e.preventDefault();
        const folder = await app.getFolder();
        setOutFolder(folder);
    });

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            onSubmitCallback({
                oFolder: outFolder,
                exportMode: exportMode,
                fileType: fileType,
                fileName: fileName,
                fileSuffix: fileSuffix,
            });
        },
        [onSubmitCallback, outFolder, exportMode, fileType, fileName, fileSuffix]
    );

    //useEffect(() => (data && setOutFolder(data)), [data]);

    return (
        <form className="input-form" onSubmit={onSubmit}>

            <div className="tile-container">
                <label className="tile-container-label">File output mode</label>

                <div className={`tile ${exportMode !== 'single' && 'disabled'}`}>
                    <div className="tile-header" onClick={onChangeExportMode("single")}>Single</div>
                    <div className="tile-body">
                        <label>Name:</label>
                        <input
                            className="input-text"
                            type="text"
                            placeholder="es: out"
                            disabled={exportMode !== 'single'}
                            onChange={onChangeFileName}
                            value={fileName}
                        />
                    </div>
                </div>

                <div className={`tile ${exportMode !== 'multiple' && 'disabled'}`}>
                    <div className="tile-header" onClick={onChangeExportMode("multiple")}>Multiple</div>
                    <div className="tile-body">
                        <label>Suffix:</label>
                        <input
                            className="input-text"
                            type="text"
                            placeholder="es: _new"
                            disabled={exportMode !== 'multiple'}
                            onChange={onChangeFileSuffix}
                            value={fileSuffix}
                        />
                        <label>Type:</label>
                        <select name="select" value={fileType} onChange={onChangeFileType} disabled={exportMode !== 'multiple'}>
                            <option value="pdf">PDF</option>
                            <option value="jpg">JPG</option>
                        </select>
                    </div>
                </div>

            </div>

            <div className="out-folder">
                <input className="input-text" type="text" onChange={onChangeOutFolder} placeholder="Output folder" value={outFolder} />
                <button className="input-button" onClick={handleClickFolderSelector} ><FontAwesomeIcon icon={faFolder} /></button>
            </div>

            <button type="submit" value="Submit"><FontAwesomeIcon icon={faPlay} /></button>
        </form >
    );
};
