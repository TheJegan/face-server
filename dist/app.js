"use strict";
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const requestId = require('request-id/express');
const app = express();
const mongoose = require('mongoose');
var path = require('path');
app.use(logger('dev'));
app.use(cors({
    exposedHeaders: ['X-Request-Id'],
    maxAge: 86400
}));
app.use(requestId());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/faces', require('./routes/face'));
const requestHandler = function (req, res, next) {
    const err = { message: 'Not Found' };
    err.status = 404;
    next(err);
};
app.use(requestHandler);
const handler = function (err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(err.status || 500);
    const propertiesToSerialize = ['message'];
    if (app.get('env') !== 'production') {
        propertiesToSerialize.push('stack');
    }
    res.send(JSON.stringify(err, propertiesToSerialize));
    res.end();
};
app.use(handler);
module.exports = app;
//# sourceMappingURL=app.js.map