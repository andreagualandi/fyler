import React from 'react'
import { app, image } from '../Client';
import Settings from './settings/Settings';
import MyList from './list/List';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import './main.less';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            settings: {
                oFolder: '',
            },
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('UPDATE');
    };

    addFiles(files) {
        //join and remove duplicates
        const joined = [...new Set(this.state.files.concat(files))];
        this.setState({ files: joined });
        console.log('STATE.FILES', this.state.files);
    }

    handleClickAddFiles = async () => {
        const files = await app.getFiles();
        console.log('FILES', files);
        this.addFiles(files);
    };

    handleClickClearFiles = () => {
        this.setState({ files: [] });
    };

    handleDrop = (e) => {
        e.preventDefault();
        const fileList = e.dataTransfer.files;
        console.log('Files Dropperd', fileList);
        const files = Object.keys(fileList).map((key) => fileList[key].path);
        this.addFiles(files);
    };

    handleListChange = (fileList) => {
        console.log('nuova lista', fileList);
        this.setState({ files: fileList });
    };

    handleFormSubmit = async (settings) => {
        console.log('Settings', settings);
        this.setState({ settings: settings });
        if (settings.exportMode === 'single') {
            await image.process(this.state.files, settings);
        } else {
            await image.compress(this.state.files, settings);
        }
    };

    render() {
        return (
            <div className="main-content" onDrop={this.handleDrop}>
                <div className="files">
                    <div className="buttons">
                        <button className="button-add" onClick={this.handleClickAddFiles}><FontAwesomeIcon icon={faPlus} /></button>
                        <button className="button-clear" onClick={this.handleClickClearFiles}><FontAwesomeIcon icon={faTrashAlt} /></button>
                    </div>
                    {
                        this.state.files.length > 0
                            ? <MyList items={this.state.files} onUpdate={this.handleListChange} />
                            : <div className="files-placeholder">EMPTY</div>
                    }
                </div>
                <div className="form">
                    <Settings onSubmitCallback={this.handleFormSubmit} />
                </div>
            </div>
        );
    }
}

