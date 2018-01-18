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
        .post(isLoggedIn, (req, res) => {
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
        });
};
