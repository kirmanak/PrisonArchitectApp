module.exports = (router, models) => {
    const isLoggedIn = (req, res, next) => {
        if (req.isAuthenticated()) next();
        else res.sendStatus(403);
    };

    router.route('/prisoner/reputations')
        .get((req, res) => {
            models.reputation.findAll().then(
                (reputations) => {
                    res.send(reputations);
                    },
                (error) => {
                    res.sendStatus(500);
                    console.error(error);
                });
        });

    router.route('/prisoner/wards')
        .post((req, res) => {
            models.access.findAll({
                include: [
                    {
                        model: models.regime,
                        where: { id: req.body.id }
                    },
                    {
                        model: models.room,
                        where: { assignment: 'Камера'}
                    }]
            }).then((resultsArray) => {
                    res.send(resultsArray);
                },
                (error) => {
                    res.sendStatus(500);
                    console.error(error);
                });
        });

    router.route('/prisoner/regimes')
        .get((req, res) => {
            models.regime.findAll().then(
                (regimes) => {
                    res.send(regimes);
                },
                (error) => {
                    res.sendStatus(500);
                    console.error(error);
                });
        });

    router.route('/prisoner/programs')
        .post((req, res) => {
            models.regime.findAll({
                include: [{
                    model: models.access,
                    include: [
                        {
                            model: models.room,
                            include: [
                                {
                                    model: models.program
                                }
                            ]
                        }
                    ]
                }],
                where: {
                    id: req.body.id
                }
            }).then((results) => {
                res.send(results);
            }, (err) => {
                console.error(err);
                res.sendStatus(500);
            });
        });

    router.route('/prisoner')
        .get((req, res) => {
            models.prisoner.count().then(
                (data) => {
                    res.json(data);
                });
        })
        .post(isLoggedIn, (req, res) => {
            console.log(req.body);
            models.prisoner.create({
                    fullname: req.body.fullName,
                    arrivement: req.body.arrivement,
                    freedom: req.body.freedom,
                    ward: JSON.parse(req.body.ward).id,
                    regime: JSON.parse(req.body.regime).id
                }).then(
                (prisoner) => {
                    req.body.programs.forEach((program) => {
                        models.prisoner_program.create({
                            prisoner: prisoner.dataValues.id,
                            program: JSON.parse(program).id
                        }).then(() => {}, (err) => {
                            console.error(err);
                            res.sendStatus(500);
                        });
                    });
                    req.body.reputations.forEach((reputation) => {
                        models.reputation_prisoner.create({
                            prisoner: prisoner.dataValues.id,
                            reputation: JSON.parse(reputation).id
                        }).then(() => {}, (err) => {
                            console.error(err);
                            res.sendStatus(500);
                        });
                    });
                },
                (error) => {
                    res.sendStatus(500);
                });
        });
};
