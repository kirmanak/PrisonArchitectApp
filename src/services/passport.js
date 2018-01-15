const LocalStrategy = require('passport-local').Strategy,
    VKStrategy = require('passport-vkontakte').Strategy;

module.exports = (bcrypt, passport, gamer) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        gamer.findById(id).then((user) => {
            done(null, user);
        }).catch((err) => {
            done(err, false);
        });
    });

    passport.use(new LocalStrategy({}, (username, password, done) => {
        gamer.findOne({ where: { username: username } }).then((user) => {
            if (!user) return done(null, false, { message: 'Incorrect username.' });
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) return done(null, user);
                else return done(null, false);
            });
        });
    }));

    passport.use(new VKStrategy({
        clientID: process.env.VK_ID,
        clientSecret: process.env.VK_SECRET,
        callbackURL: '/login/vkontakte/callback',
        apiVersion: '5.69'
    }, (accessToken, refreshToken, params, profile, done) => {
        gamer.findOrCreate({ where: { username: profile.id} }).then((result) => {
            done(null, result);
        }, (error) => {
            done(null, false);
        });
    }));
};
