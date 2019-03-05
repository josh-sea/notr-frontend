import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ActionCableProvider } from 'react-actioncable-provider';
const CABLEURL = 'localhost:9000/'
// const CABLEURL = 'window.location.hostname:9000/'

ReactDOM.render(
  <ActionCableProvider url={`ws://${CABLEURL}cable`}>
    <App />
  </ActionCableProvider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
