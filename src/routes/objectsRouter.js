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
                console.error(error);
                res.sendStatus(500);
            });
        });

    router.route('/object/rooms')
        .get((req, res) => {
            models.room.findAll().then((results) => {
                res.send(results);
            }, (error) => {
                console.error(error);
                res.sendStatus(500);
            });
        });

    router.route('/object')
        .get((req, res) => {
            models.object.count()
                .then((data) => {
                    res.json(data);
                });
        })
        .put(isLoggedIn, (req, res) => {
            if (!req.body.room_fk || !req.body.thing_type_fk) {
                res.sendStatus(400);
                return;
            }
            // noinspection JSCheckFunctionSignatures
            models.object.create({
                thing_type_fk: req.body.thing_type_fk,
                room_fk: req.body.room_fk
            }).then(() => {
                res.sendStatus(200);
            }, (error) => {
                console.error(error);
                res.sendStatus(500);
            });
        })
        .patch(isLoggedIn, (req, res) => {
            if (!req.body.id || !req.body.thing_type_fk || !req.body.room_fk) {
                res.sendStatus(400);
                return;
            }
            models.object.update({
                thing_type_fk: req.body.thing_type_fk,
                room_fk: req.body.room_fk
            }, {
                where: {id: req.body.id}
            }).then((result) => {
                res.sendStatus(200);
            }, (error) => {
                console.error(error);
                res.sendStatus(500);
            })

        })
        .post(isLoggedIn, (req, res) => {
            if (!req.body.id) {
                res.sendStatus(400);
                return;
            }

            models.object.destroy({where: {id: req.body.id}}).then((result) => {
                res.sendStatus(200);
            }, (error) => {
                console.error(error);
                res.sendStatus(500);
            })
        });

    router.route('/object/search')
        .post((req, res) => {
            if (!req.body.thing_type_fk || !req.body.room_fk) {
                res.sendStatus(400);
                return;
            }

            models.object.findAll({
                where: {
                    thing_type_fk: req.body.thing_type_fk,
                    room_fk: req.body.room_fk
                }, include: [
                    models.room, models.thing_type
                ]
            }).then((results) => {
                res.send(results);
            }, (error) => {
                console.error(error);
                res.sendStatus(500);
            });
        });
};
