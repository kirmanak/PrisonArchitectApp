module.exports = (router, models) => {
    const isLoggedIn = (req, res, next) => {
        if (req.isAuthenticated()) next();
        else res.sendStatus(403);
    };

    router.route('/room/accesses')
        .get((req, res) => {
            models.access.findAll().then((results) => {
                res.send(results);
            }, (error) => {
                console.error(error);
                res.sendStatus(500);
            })
        });

    router.route('/room')
        .put(isLoggedIn, (req, res) => {
            if (!req.body.assignment || !req.body.access_fk ||
                !req.body.area || typeof req.body.street === 'undefined') {
                res.sendStatus(400);
                return;
            }
            models.room.create({
                assignment: req.body.assignment,
                access_fk: req.body.access_fk,
                area: req.body.area,
                street: req.body.street
            }).then((results) => {
                res.sendStatus(200);
            }, (error) => {
                console.error(error);
                res.sendStatus(500);
            })
        })
        .get((req, res) => {
            models.room.count()
                .then((data) => {
                    res.json(data);
                });
        })
        .patch(isLoggedIn, (req, res) => {
            if (!req.body.id || !req.body.assignment || !req.body.access_fk ||
                !req.body.area || typeof req.body.street === 'undefined') {
                res.sendStatus(400);
                return;
            }
            models.room.update({
                assignment: req.body.assignment,
                access_fk: req.body.access_fk,
                area: req.body.area,
                street: req.body.street
            }, {
                where: { id: req.body.id }
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
            models.room.destroy({ where: { id: req.body.id } }).then((result) => {
                res.sendStatus(200);
            }, (error) => {
                console.error(error);
                res.sendStatus(500);
            })
        });

    router.route('/room/search')
        .post((req, res) => {
            if (!req.body.assignment || !req.body.access_fk) {
                res.sendStatus(400);
                return;
            }

            models.room.findAll({
                where: {
                    assignment: req.body.assignment,
                    access_fk: req.body.access_fk
                },
                include: [
                    models.access
                ]}).then((results) => {
                res.send(results);
            }, (error) => {
                console.error(error);
                res.sendStatus(500);
            });
        })
};
