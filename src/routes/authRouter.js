module.exports = (router, passport, gamers) => {
    router.route('/login')
        .post(passport.authenticate('local', 
            { 
                successRedirect: '#/main',
                failureRedirect: '#/login'
            }));

    router.route('/register')
        .post((req, res) => {
            gamers.create(
                {
                    username: req.body.username,
                    password: req.body.password
                }
            ).then(() => { 
                res.redirect('#/login'); 
            });
        });


};
