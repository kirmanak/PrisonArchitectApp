module.exports = (router, prisoner) => {
    router.route('/prisoner')
            .get((req, res) => {
                if (!req.isAuthenticated())
                    res.redirect('/login');
                else prisoner.count()
                    .then((data) => { res.json(data); });
            }).post((req, res) => {
                prisoner.create(req.body)
                    .then(() => { console.log("Successfully saved!"); });
            });
};
