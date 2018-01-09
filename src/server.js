// imports
const express = require('express'),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    app = express(),
    // routes
    authRouter = require('./routes/authRouter.js'),
    prisonerRouter = require('./routes/prisonerRouter.js'),
    staffRouter = require('./routes/staffRouter.js'),
    objectsRouter = require('./routes/objectsRouter.js'),
    roomsRouter = require('./routes/roomsRouter.js'),
    // services
    db = require('./services/db.js'),
    auth = require('./services/passport.js'),
    rabbitmq = require('./services/rabbitmq.js'),
    config = require('./config/config.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// passport configs
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// db initialization
const dbConn = db.initialize();
db.sync();

auth(passport, dbConn.models.user);

authRouter(app, passport, dbConn.models.user);
prisonerRouter(app, dbConn.models.prisoner);
staffRouter(app, dbConn.models.staff);
objectsRouter(app, dbConn.models.object);
roomsRouter(app, dbConn.models.room);

// rabbitmq(config);

app.use(express.static(__dirname + '/public'));

app.listen(config.port, () => console.log('Server running at http://localhost:' + config.port + '/'));
