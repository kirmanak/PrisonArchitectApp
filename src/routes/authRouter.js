module.exports = (router, passport, users) => {
    router.route('/login')
        .post(passport.authenticate('local', 
            { 
                successRedirect: '/',
                failureRedirect: '/login'
            }))
        .get((req, res) => {
            res.send('Incorrect password?');
        });

    router.route('/register')
        .post((req, res) => {
            models.user.create(
                {
                    username: req.body.username,
                    password: req.body.password
                }
            ).then(() => { 
                res.redirect('/'); 
            });
        });


};
