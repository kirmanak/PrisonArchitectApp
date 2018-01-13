module.exports = (router, prisoner) => {
    const isLoggedIn = (req, res, next) => {
        if (req.isAuthenticated()) next();
        else res.sendStatus(403);
    };

    router.route('/prisoner')
            .get(isLoggedIn, (req, res) => {
                prisoner.count()
                    .then((data) => { res.json(data); });
            }).post((req, res) => {
                prisoner.create(req.body)
                    .then(() => { console.log("Successfully saved!"); });
            });
};
