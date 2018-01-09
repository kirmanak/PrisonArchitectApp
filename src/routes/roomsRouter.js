module.exports = (router, rooms) => {
    router.route('/rooms')
            .get((req, res) => {
                    rooms.count()
                        .then((data) => { res.json(data); });
            });
};
