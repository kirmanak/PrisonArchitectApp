const SALT_ROUNDS = 10;

module.exports = (bcrypt, router, passport, gamers) => {
    router.route('/loggedin')
        .get((req, res) => {
            // noinspection Annotator
            res.sendStatus(req.isAuthenticated() ? 200 : 401)
        });

    router.route('/logout')
        .get((req, res) => {
            // noinspection Annotator
            req.session.destroy();
            // noinspection Annotator
            req.logout();
            res.sendStatus(401);
        });

    router.route('/login')
        .post(passport.authenticate('local'));

    router.route('/register')
        .post((req, res) => {
            if (!req.body.password || !req.body.username) {
                res.sendStatus(400);
                return;
            }
            bcrypt.hash(req.body.password, SALT_ROUNDS, (err, hash) => {
                if (err) {
                    res.sendStatus(500);
                    return;
                }
                gamers.create({
                    username: req.body.username,
                    password: hash
                }).then(() => {
                    res.sendStatus(200);
                }, (error) => {
                    res.sendStatus(400);
                });
            });
        });

    router.route('/vkontakte/callback')
        .get(passport.authenticate('vkontakte', {
            successRedirect: '/',
            failureRedirect: '/login'
        }));

    router.route('/vkontakte')
        .get(passport.authenticate('vkontakte'));
};
