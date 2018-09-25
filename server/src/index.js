import {AppContainer} from "../../client/src/AppContainer";

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter} from 'react-router';

mongoose.set('debug', true);

/*
When we don't have locally installed MongoDB, we can use it online.
 */
if (process.env.LOCAL) {
  mongoose.connect('mongodb://localhost/test');
} else {
  // todo move password to .env
  mongoose.connect('mongodb://senenkovitalik:iJFggFnXRUkhRPYv@todo-shard-00-00-0myio.mongodb.net:27017,todo-shard-00-01-0myio.mongodb.net:27017,todo-shard-00-02-0myio.mongodb.net:27017/test?ssl=true&replicaSet=Todo-shard-0&authSource=admin',
    {useNewUrlParser: true}
  );
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log(`Successfully connected to ${process.env.LOCAL ? 'Local MongoDB' : 'MongoDB Atlas'}`);
});

const app = express();

app.use(morgan('dev'));

app.set('views', process.cwd() + '/client/dist');
app.set('view engine', 'pug');

app.use(express.static(process.cwd() + '/client/dist/'));

app.use(session({
  cookie: {secure: false, maxAge: 86400},
  secret: 'vEry_$tr0ng-P@$$',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const routes = require('./routes/router');
app.use("/api", routes);

// SSR
app.get(/^(?!\/api).+$/, (req, res) => {
  const context = {};

  const content = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <AppContainer logged={!!req.session.user_id} />
    </StaticRouter>
  );

  if (context.url) {
    res.writeHead(301, {
      Location: context.url
    });
    res.end();
  } else {
    res.render('index', {content: content});
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});