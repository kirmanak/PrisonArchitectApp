const LocalStrategy = require('passport-local').Strategy;

module.exports = (passport, userModel) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        userModel.findById(id).then((user) => {
            done(null, user);
        }).catch((err) => {
            done(err, false);
        });
    });
    
    passport.use(new LocalStrategy((username, password, done) => {
        userModel.findOne({where: {username: username}}).then((user) => {
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
