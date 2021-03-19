import React from 'react'
import { app, image } from '../Client';
import Table from './table/Table';
import InputText from './inputText/InputText';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrashAlt, faPlay, faFolder } from '@fortawesome/free-solid-svg-icons'

import './main.less';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            data: [],
            oFolder: '',
        }
        this.columns = [];
    }

    componentDidMount() {
        console.log('main.mount');
        this.columns = [
            {
                Header: 'Files',
                columns: [
                    {
                        Header: 'Name',
                        accessor: 'name',
                    },
                    {
                        Header: 'Type',
                        accessor: 'type',
                    },
                ],
            }
        ];

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
        await image.process(this.state.files, this.state.oFolder);
    };



    handleClickAddFiles = async () => {
        const files = await app.getFiles();
        console.log('FILES', files);
        this.setState({ files: files });

        const data = this.makeData(files);
        this.setState({ data: data });
    };

    makeData(files) {
        return files.map((file) => {
            const splitted = file.split('.');
            return { name: file, type: splitted[1] };
        });
    }

    handleClickClearFiles = () => {
        this.setState({ data: [] });
    };

    handleClickFolderSelector = async () => {
        const folder = await app.getFolder();
        this.setState({ oFolder: folder });
    }

    render() {
        return (
            <div className="main-content">
                <div className="files">
                    <div className="buttons">
                        <button className="button-add" onClick={this.handleClickAddFiles}><FontAwesomeIcon icon={faPlus} /></button>
                        <button className="button-clear" onClick={this.handleClickClearFiles}><FontAwesomeIcon icon={faTrashAlt} /></button>
                    </div>
                    {
                        this.state.data.length > 0
                            ? <Table columns={this.columns} data={this.state.data} />
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
