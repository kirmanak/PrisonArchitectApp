module.exports = (router, passport, gamers) => {
    router.route('/logout')
        .get((req) => {
            req.logout();
        });

    router.route('/login')
        .post(passport.authenticate('local'));

    router.route('/register')
        .post((req, res) => {
            gamers.create(
                {
                    username: req.body.username,
                    password: req.body.password
                }
            ).then(
                () => {
                    res.redirect('#/login')
                },
                (err) => {
                    console.err(err);
                    res.sendStatus(500);
                });
        });


};
