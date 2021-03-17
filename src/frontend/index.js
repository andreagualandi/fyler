import React from 'react'
import ReactDOM from 'react-dom'
import './global.less';
import Main from './components/Main';

document.addEventListener('dragover', (e) => {
    e.preventDefault();
    return false;
}, false);

document.addEventListener('drop', (e) => {
    e.preventDefault();
    return false;
}, false);

ReactDOM.render(<Main />, document.getElementById('root'));