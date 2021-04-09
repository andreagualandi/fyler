import React, { useCallback, useState, useEffect } from "react";
import { app } from '../../Client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faPlay } from '@fortawesome/free-solid-svg-icons'

import './settings.less';

export default function settings({ onSubmitCallback, data }) {
    const [outFolder, setOutFolder] = useState('');
    const onChangeOutFolder = useCallback((e) => setOutFolder(e.target.value), [setOutFolder]);

    const [exportType, setExportType] = useState('single');
    const onChangeExportType = useCallback((e) => setExportType(e.target.value), [setExportType]);

    const handleClickFolderSelector = useCallback(async (e) => {
        e.preventDefault();
        const folder = await app.getFolder();
        setOutFolder(folder);
    });

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            onSubmitCallback({ oFolder: outFolder, exportType: exportType });
        },
        [onSubmitCallback, outFolder, exportType]
    );

    useEffect(() => (data && setOutFolder(data)), [data]);

    return (
        <form className="input-form" onSubmit={onSubmit}>
            <div className="radio-container">
                <div className="radio-div">
                    <div className="radio-button">
                        <label>Single</label>
                        <input type="radio" value="single" name="exportType" checked={exportType === "single"} onChange={onChangeExportType} />

                    </div>
                    <input className="input-text" type="text" placeholder="File name" />
                </div>
                <div className="radio-div">
                    <div className="radio-button">
                        <label>Multiple</label>
                        <input type="radio" value="multiple" name="exportType" checked={exportType === "multiple"} onChange={onChangeExportType} />
                    </div>
                    <input className="input-text" type="text" placeholder="Append postfix" />
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
