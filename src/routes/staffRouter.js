module.exports = (router, models) => {
    const isLoggedIn = (req, res, next) => {
        if (req.isAuthenticated()) next();
        else res.sendStatus(403);
    };

    router.route('/staff/appointments')
        .get((req, res) => {
            models.appointment.findAll().then((results) => {
                res.send(results);
            }, (error) => {
                res.sendStatus(500);
            });
        });

    router.route('/staff/offices')
        .get((req, res) => {
            models.room.findAll().then((results) => {
                res.send(results);
            }, (error) => {
                res.sendStatus(500);
            });
        });

    router.route('/staff')
            .get((req, res) => {
                    models.staff.count()
                        .then((data) => { res.json(data); });
            }).post(isLoggedIn, (req, res) => {
                models.staff.create({
                    fullname: req.body.fullName,
                    appointment: JSON.parse(req.body.appointment).id,
                    office_fk: JSON.parse(req.body.office).id
                }).then(() => {
                        res.sendStatus(200);
                    }, (error) => {
                        res.sendStatus(500);
                    });
            });
};
