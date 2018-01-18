module.exports = (sendToMQ, router, models) => {
    const isLoggedIn = (req, res, next) => {
        if (req.isAuthenticated()) next();
        else res.sendStatus(403);
    };

    router.route('/staff/appointments')
        .get((req, res) => {
            models.appointment.findAll().then((results) => {
                res.send(results);
            }, (error) => {
                console.error(error);
                res.sendStatus(500);
            });
        });

    router.route('/staff/offices')
        .get((req, res) => {
            models.room.findAll().then((results) => {
                res.send(results);
            }, (error) => {
                console.error(error);
                res.sendStatus(500);
            });
        });

    router.route('/staff')
        .get((req, res) => {
            // noinspection Annotator
            models.staff.count()
                .then((data) => {
                    res.json(data);
                });
        })
        .put(isLoggedIn, (req, res) => {
            if (!req.body.fullname || !req.body.appointment_fk || !req.body.office_fk) {
                res.sendStatus(400);
                return;
            }
            // noinspection JSCheckFunctionSignatures
            models.staff.create({
                fullname: req.body.fullname,
                appointment_fk: req.body.appointment_fk,
                office_fk: req.body.office_fk
            }).then((result) => {
                res.sendStatus(200);
                // noinspection Annotator
                sendToMQ(new Buffer('Пользователем ' + req.user.username +
                    ' добавлен сотрудник с id ' + result.dataValues.id));
            }, (error) => {
                console.error(error);
                res.sendStatus(500);
            });
        });
};
