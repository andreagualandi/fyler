import React from 'react'
import { app, image } from '../Client';
import InputText from './inputText/InputText';
import MyList from './list/List';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrashAlt, faPlay, faFolder } from '@fortawesome/free-solid-svg-icons'

import './main.less';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            oFolder: '',
        }
    }

    componentDidMount() {
        console.log('main.mount');
    }

    componentWillUnmount() {
        console.log('main.unmount');
    }

    /* shouldComponentUpdate(nextProps, nextState) {
        return nextState.currTime !== 
        if (nextState.source !== this.state.player) {
            return true;
        }
        if (nextProps.source !== this.props.source) {
            return true;
        }
        return false;
    } */

    componentDidUpdate(prevProps, prevState) {
        console.log('UPDATE');
    };

    handleClickSubmit = async () => {
        console.log('lista da elaborare', this.state.files);
        //await image.process(this.state.files, this.state.oFolder);
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

    handleClickFolderSelector = async () => {
        const folder = await app.getFolder();
        this.setState({ oFolder: folder });
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
                    <InputText onSubmitCallback={this.handleClickFolderSelector} data={this.state.oFolder} placeholder='Output folder'>
                        <FontAwesomeIcon icon={faFolder} />
                    </InputText>
                    <button onClick={this.handleClickSubmit}><FontAwesomeIcon icon={faPlay} /></button>
                </div>
            </div>
        );
    }
}

