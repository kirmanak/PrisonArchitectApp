module.exports = (router, models) => {
    router.route('/rooms')
            .get((req, res) => {
                    models.room.count()
                        .then((data) => { res.json(data); });
            });
};
