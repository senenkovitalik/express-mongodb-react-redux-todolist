const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from '../../client/src/app';

mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Successfully connected to MongoDB");
});

const app = express();

app.use(morgan('dev'));

// app.set('layouts', process.cwd() + '/server/src/layouts');
// app.set('views', app.get('layouts'));
// app.set('view engine', 'pug');

app.use(express.static(process.cwd()+'/client/dist/'));

app.use(session({
  secret: 'vEry_$tr0ng-P@$$',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const routes = require('./routes/router');
app.use("/api", routes);

// SSR
app.get('*', (req, res) => {
  const context = {};

  const html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  if (context.url) {
    res.writeHead(301, {
      Location: context.url
    });
    res.end();
  } else {
    res.write(`
      <!doctype html>
      <div id="app">${html}</div>
    `);
    res.end();
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});