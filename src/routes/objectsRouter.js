module.exports = (router, objects) => {
    router.route('/objects')
            .get((req, res) => {
                    objects.count()
                        .then((data) => { res.json(data); });
            });
};
