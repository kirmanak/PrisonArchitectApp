// imports
// noinspection NpmUsedModulesInstalled
// noinspection NpmUsedModulesInstalled
// noinspection NpmUsedModulesInstalled
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
    config = require('./config/config.json'),
    db = require('./services/db.js')(config);

if (!process.env.VK_ID || !process.env.VK_SECURE) {
    throw new Error('You have to specify vk app id and secret');
}

// noinspection NpmUsedModulesInstalled
app.use(require('cookie-parser')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// passport configs
// noinspection NpmUsedModulesInstalled
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
// noinspection Annotator
app.use(passport.initialize());
// noinspection Annotator
app.use(passport.session());

// noinspection Annotator
auth(bcrypt, passport, db.models.gamer);

// routes
// noinspection Annotator
// noinspection Annotator
authRouter(bcrypt, app, passport, db.models.gamer);
// noinspection Annotator
prisonerRouter(app, db.models);
// noinspection Annotator
objectsRouter(app, db.models);
// noinspection Annotator
roomsRouter(app, db.models);

// noinspection NpmUsedModulesInstalled
require('amqplib').connect(config.rabbitHost).then((conn) => {
    conn.createChannel().then((ch) => {
        ch.assertExchange(config.rabbitEx, 'fanout', { durable: false});

        // the last entity route
        // noinspection Annotator
        staffRouter((buff) => { ch.publish(config.rabbitEx, '', buff); }, app, db.models);

        app.use(express.static(__dirname + '/public'));
        app.use('*', (req, res) => {
            res.sendFile(__dirname + '/public/index.html');
        });

        // noinspection NpmUsedModulesInstalled
        app.use(require('compression'));
        app.listen(config.port, () => console.log('Server running at http://localhost:' + config.port + '/'));
    }, (error) => {
        throw new Error(error);
    });
}, (error) => {
    throw new Error(error);
});

