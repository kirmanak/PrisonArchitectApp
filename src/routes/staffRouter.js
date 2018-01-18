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
        }).post(isLoggedIn, (req, res) => {
        // noinspection JSCheckFunctionSignatures
        models.staff.create({
            fullname: req.body.fullName,
            appointment_fk: JSON.parse(req.body.appointment).id,
            office_fk: JSON.parse(req.body.office).id
        }).then((result) => {
            res.sendStatus(200);
            sendToMQ(new Buffer('Пользователем ' + req.user.username +
                ' добавлен сотрудник с id ' + result.dataValues.id));
        }, (error) => {
            console.error(error);
            res.sendStatus(500);
        });
    });
};
