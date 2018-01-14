module.exports = (router, passport, gamers) => {
    router.route('/loggedin')
        .get((req, res) => {
            res.sendStatus(req.isAuthenticated() ? 200 : 401)
        });

    router.route('/logout')
        .get((req, res) => {
            req.session.destroy();
            req.logout();
            res.sendStatus(401);
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
                    res.sendStatus(200);
                },
                () => {
                    res.sendStatus(401);
                });
        });


};
