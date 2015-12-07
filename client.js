/*global document, window */

import ReactDOM from 'react-dom';
import React from 'react';
import debug from 'debug';
import { createElementWithContext } from 'fluxible-addons-react';
import app from './app';

const debugClient = debug('test');
const dehydratedState = window.App; // Sent from the server

window.React = ReactDOM; // For chrome dev tool support
window.fluxibleDebug = debug;

debugClient('rehydrating app');

// pass in the dehydrated server state from server.js
app.rehydrate(dehydratedState, (err, context) => {
    if (err) {
        throw err;
    }
    window.context = context;
    const mountNode = document.getElementById('todoapp');

    ReactDOM.render(
        createElementWithContext(context),
        mountNode,
        () => debugClient('React Rendared')
    );
});
