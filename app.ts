import express = require('express');
import logger = require('morgan');
import cors = require('cors');
import bodyParser = require('body-parser');
const requestId = require('request-id/express');
import { settings } from './env';
const app = express();
const mongoose = require('mongoose');
var path = require('path');

//mongoose.connect(settings.avocadoDb);

app.use(logger('dev'));
app.use(cors({
  exposedHeaders: ['X-Request-Id'],
  maxAge: 86400
}));
app.use(requestId());

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//TODO: add routing authentication
app.use('/faces', require('./routes/face'));

// Unauthenticated Routes

// app.use('/', function (req, res, next) { res.sendStatus(204).end(); }); // to keep AlwaysOn flooding logs with errors

interface IStatusError extends Error {
  status: Number;
}

// catch 404 and forward to error handler
const requestHandler: express.RequestHandler = function (req, res, next) {
  const err = <IStatusError>{ message: 'Not Found' };
  err.status = 404;
  next(err);
};
app.use(requestHandler);

// error handlers

const handler: express.ErrorRequestHandler = function (err, req, res, next) {
  // appInsights.client.trackException(err, { name: 'SvcRequestFailure', correlationId: req['requestId'] });

  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500);

  const propertiesToSerialize: string[] = ['message'];
  if (app.get('env') !== 'production') {
    propertiesToSerialize.push('stack');
  }

  // Properties on Error object aren't enumerable so need to explicitly list properties to serialize
  res.send(JSON.stringify(err, propertiesToSerialize));
  res.end();
};
app.use(handler);

// analytics
// if (process.env['APPINSIGHTS_INSTRUMENTATIONKEY']) {
//   appInsights.setup().start();
// }
// if (!process.env['APPINSIGHTS_INSTRUMENTATIONKEY'] || process.env['APPINSIGHTS_INSTRUMENTATIONKEY'] === 'mock') {
//   appInsights.client = new mockInsights();
// }

// export var App = app;
module.exports = app;
