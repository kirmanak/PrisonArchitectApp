const LocalStrategy = require('passport-local').Strategy,
    VKStrategy = require('passport-vkontakte').Strategy;

module.exports = (bcrypt, passport, gamer) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        gamer.findById(id).then((user) => {
            done(null, user);
        }, (err) => {
            done(err, false);
        });
    });

    passport.use(new LocalStrategy({}, (username, password, done) => {
        gamer.findOne({ where: { username: username } }).then((result) => {
            if (!result) return done(null, false);
            // noinspection Annotator
            bcrypt.compare(password, result.password, (err, res) => {
                if (res) return done(null, result);
                else return done(null, false);
            }, (error) => {
                console.error(error);
                return done(null, false);
            });
        });
    }));

    passport.use(new VKStrategy({
        clientID: process.env.VK_ID,
        clientSecret: process.env.VK_SECURE,
        callbackURL: '/vkontakte/callback',
        apiVersion: '5.69'
    }, (accessToken, refreshToken, params, profile, done) => {
        // noinspection Annotator
        gamer.findOrCreate({ where: {
            username: profile.id.toString()
        }}).spread((gamer, created) => {
            done(null, gamer);
        }).catch((error) => {
            console.error(error);
            done(null, false);
        });
    }));
};
