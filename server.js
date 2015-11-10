/**
 * This leverages Express to create and run the http server.
 * A Fluxible context is created and executes the navigateAction
 * based on the URL. Once completed, the store state is dehydrated
 * and the application is rendered via React.
 */

import express from 'express';
import bodyParser from 'body-parser';
import serialize from 'serialize-javascript';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import React from 'react';
import ReactDOM from 'react-dom/server';
import app from './app';
import showTodos from './actions/showTodos'
import HtmlComponent from './components/Html';
import { createElementWithContext } from 'fluxible-addons-react';

var server = express();
server.set('state namespace', 'App');
server.use('/public', express.static(__dirname + '/build'));
server.use('/assets', express.static(__dirname + '/assets'));
server.use(cookieParser());
server.use(bodyParser.json());
server.use(csrf({cookie: true}));


// Get access to the fetchr plugin instance
var fetchrPlugin = app.getPlugin('FetchrPlugin');

// Register our todos REST service
fetchrPlugin.registerService(require('./services/todo'));

// Set up the fetchr middleware
server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

// Every other request gets the app bootstrap
server.use(function (req, res, next) {
    var context = app.createContext({
        req: req, // The fetchr plugin depends on this
        xhrContext: {
            _csrf: req.csrfToken() // Make sure all XHR requests have the CSRF token
        }
    });

    context.executeAction(showTodos, {}, function (err) {
        if (err) {
            if (err.statusCode && err.statusCode === 404) {
                return next();
            }
            else {
                return next(err);
            }
        }

        var exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

        var componentContext = context.getComponentContext();
        var htmlElement = React.createElement(HtmlComponent, {
            state: exposed,
            markup: ReactDOM.renderToString(createElementWithContext(context)),
            context: componentContext
        });
        var html = ReactDOM.renderToStaticMarkup(htmlElement);

        res.send(html);
    });
});

const port = process.env.PORT || 3000;
server.listen(port);
console.log('Application listening on port ' + port);

export default server;
