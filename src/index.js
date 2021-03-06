import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ActionCableProvider } from 'react-actioncable-provider';
// const CABLEURL = `ws://localhost:3000/api/v1/cable`
// const CABLEURL = `wss://notr-backend.herokuapp.com/api/v1/cable`
const CABLEURL = `ws://${window.location.hostname}:3000/api/v1/cable`

ReactDOM.render(
  <ActionCableProvider url={`${CABLEURL}`}>
    <App />
  </ActionCableProvider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
