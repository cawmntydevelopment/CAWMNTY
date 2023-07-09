import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import "./styles/fonts"
import process from "process";
import {Buffer} from "buffer";
import EventEmitter from "events";

window.global = window;
window.process = process;
window.Buffer = Buffer;
global.process = global.process || process;
global.Buffer = global.Buffer || Buffer
// @ts-ignore
window.EventEmitter = EventEmitter;

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
)
