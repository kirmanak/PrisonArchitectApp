const LocalStrategy = require('passport-local').Strategy;

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
                else return done(null, false, { message: 'Incorrect password.' });
            });
        });
    }));
};
