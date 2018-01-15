// imports
const express = require('express'),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    bcrypt = require('bcrypt'),
    app = express(),
    // routes
    authRouter = require('./routes/authRouter.js'),
    prisonerRouter = require('./routes/prisonerRouter.js'),
    staffRouter = require('./routes/staffRouter.js'),
    objectsRouter = require('./routes/objectsRouter.js'),
    roomsRouter = require('./routes/roomsRouter.js'),
    // services
    auth = require('./services/passport.js'),
    rabbitmq = require('./services/rabbitmq.js'),
    config = require('./config/config.json'),
    db = require('./services/db.js')(config);

app.use(require('cookie-parser')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// passport configs
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

auth(bcrypt, passport, db.models.gamer);

// routes
authRouter(bcrypt, app, passport, db.models.gamer);
staffRouter(app, db.models);
prisonerRouter(app, db.models);
objectsRouter(app, db.models.object);
roomsRouter(app, db.models.room);
app.use(express.static(__dirname + '/public'));
// the last chance
app.use('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// rabbitmq(config);

app.use(require('compression'));
app.listen(config.port, () => console.log('Server running at http://localhost:' + config.port + '/'));
