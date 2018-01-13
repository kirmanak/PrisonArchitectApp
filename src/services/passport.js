const LocalStrategy = require('passport-local').Strategy;

module.exports = (passport, gamer) => {
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
    
    passport.use(new LocalStrategy((username, password, done) => {
        gamer.findOne({where: {username: username}}).then((user) => {
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            } else if (password != user.password) {
                return done(null, false, { message: 'Incorrect password.' });
            } else {
                done(null, user);
            }
        });
    }));
};
