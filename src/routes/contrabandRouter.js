module.exports = (router, models) => {
    const isLoggedIn = (req, res, next) => {
        if (req.isAuthenticated()) next();
        else res.sendStatus(403);
    };

    router.route('/contraband/objects')
        .get((req, res) => {
            // noinspection Annotator
            models.object.findAll({
                include: [models.thing_type]
            }).then((results) => {
                res.send(results);
            }, (error) => {
                console.error(error);
                res.sendStatus(500);
            });
        });

    router.route('/contraband/prisoners')
        .get((req, res) => {
            models.prisoner.findAll().then((results) => {
                res.send(results);
            }, (error) => {
                console.error(error);
                res.sendStatus(500);
            });
        });

    router.route('/contraband/staff')
        .get((req, res) => {
            models.staff.findAll().then((results) => {
                res.send(results);
            }, (error) => {
                console.error(error);
                res.sendStatus(500);
            });
        });


    router.route('/contraband')
        .get((req, res) => {
            models.contraband.count()
                .then((data) => {
                    res.json(data);
                });
        })
        .put(isLoggedIn, (req, res) => {
            if (!req.body.object_fk || !req.body.owner_fk ||
            !req.body.discovered_by_fk || !req.body.discovered_on) {
                res.sendStatus(400);
                return;
            }
            // noinspection JSCheckFunctionSignatures
            models.contraband.create({
                object_fk: req.body.object_fk,
                owner_fk: req.body.owner_fk,
                discovered_by_fk: req.body.discovered_by_fk,
                discovered_on: req.body.discovered_on
            }).then(() => {
                res.sendStatus(200);
            }, (error) => {
                console.error(error);
                res.sendStatus(500);
            });
        })
        .patch(isLoggedIn, (req, res) => {
            if (!req.body.id || !req.body.owner_fk) {
                res.sendStatus(400);
                return;
            }
            models.object.update({
                owner_fk: req.body.owner_fk,
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

            models.object.destroy({where: { id: req.body.id }}).then((result) => {
                res.sendStatus(200);
            }, (error) => {
                console.error(error);
                res.sendStatus(500);
            })
        });

    router.route('/contraband/search')
        .post((req, res) => {
            if (!req.body.owner_fk) {
                res.sendStatus(400);
                return;
            }

            models.contraband.findAll({
                where: {
                    owner_fk: req.body.owner_fk
                }, include: [
                    models.room, models.thing_type, models.object,
                    models.staff, models.prisoner
                ]
            }).then((results) => {
                res.send(results);
            }, (error) => {
                console.error(error);
                res.sendStatus(500);
            });
        });
};
