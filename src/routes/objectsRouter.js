module.exports = (router, models) => {
    const isLoggedIn = (req, res, next) => {
        if (req.isAuthenticated()) next();
        else res.sendStatus(403);
    };

    router.route('/object/types')
        .get((req, res) => {
            // noinspection Annotator
            models.thing_type.findAll().then((results) => {
                res.send(results);
            }, (error) => {
                res.sendStatus(500);
            });
        });

    router.route('/object/rooms')
        .get((req, res) => {
            models.room.findAll().then((results) => {
                res.send(results);
            }, (error) => {
                res.sendStatus(500);
            });
        });

    router.route('/object')
        .get((req, res) => {
            models.object.count()
                .then((data) => {
                    res.json(data);
                });
        }).post(isLoggedIn, (req, res) => {
        models.object.create({
            thing_type_fk: JSON.parse(req.body.type).id,
            room_fk: JSON.parse(req.body.room).id
        }).then(() => {
            res.sendStatus(200);
        }, (error) => {
            res.sendStatus(500);
        });
    });
};

