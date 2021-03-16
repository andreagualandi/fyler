import React from 'react'
import { app, image } from '../../Client';

import './home.less';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: []
        }
    }

    componentDidMount() {
        console.log('player.mount');

    }

    componentWillUnmount() {
        console.log('player.unmount');
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

    handleClickOpen = async () => {
        //this.setState({ outFile: fileName });
        const files = await app.getFiles();
        //const files = ['/home/andrea/Immagini/1920x1080.png'];
        console.log('FILES', files);
        await image.process(files);
    };


    render() {
        return (
            <div className="home-content">
                <button onClick={this.handleClickOpen}>Open</button>
            </div>
        );
    }
}
