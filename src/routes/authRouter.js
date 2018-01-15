const SALT_ROUNDS = 10;

module.exports = (bcrypt, router, passport, gamers) => {
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
            bcrypt.hash(req.body.password, SALT_ROUNDS, (err, hash) => {
                if (err) {
                    res.sendStatus(500);
                    return;
                }
                gamers.create({
                    username: req.body.username,
                    password: hash
                }).then(() => {res.sendStatus(200); },
                    () => { res.sendStatus(400); });
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
