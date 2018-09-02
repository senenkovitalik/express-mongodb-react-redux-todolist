const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from '../../client/src/App';

mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Successfully connected to MongoDB");
});

const app = express();

app.use(morgan('dev'));

app.set('views', process.cwd() + '/client/dist');
app.set('view engine', 'pug');

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
app.get(/^(?!\/api).+$/, (req, res) => {
  const context = {};

  const content = ReactDOMServer.renderToString(
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
    res.render('index', { content: content });
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});