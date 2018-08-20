const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Successfully connected to MongoDB");
});

const app = express();

app.use(morgan('dev'));

app.set('layouts', process.cwd() + '/server/src/layouts');
app.set('views', app.get('layouts'));
app.set('view engine', 'pug');

app.use(express.static(process.cwd()+'/server/src/'));
app.use(express.static(process.cwd()+'/'));

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

// stub route
app.get('/', (req, res) => {
  res.render('index');
});

// stub route
app.get('/login', (req, res) => {
  res.status(200).send("OK");
});

const routes = require('./routes/router');
app.use("/api", routes);

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});