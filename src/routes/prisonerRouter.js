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
                });
        });

    router.route('/prisoner/wards')
        .post((req, res) => {
            models.room.findAll({
                required: true,
                where: { assignment: 'Камера' },
                include: [
                    {
                        model: models.access,
                        required: true,
                        include: [{
                            model: models.regime,
                            required: true,
                            where: { id: req.body.id }
                        }]
                    }]
            }).then((resultsArray) => {
                    res.send(resultsArray);
                },
                (error) => {
                    res.sendStatus(500);
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
                });
        });

    router.route('/prisoner/programs')
        .post((req, res) => {
            models.program.findAll({
                include: [{
                    model: models.room,
                    include: [{
                        model: models.access,
                        include: [{
                            model: models.regime,
                            where: { id: req.body.id },
                            required: true
                        }],
                        required: true
                    }],
                    required: true
                }],
                required: true,
            }).then((results) => {
                res.send(results);
            }, (err) => {
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
            models.prisoner.create({
                    fullname: req.body.fullName,
                    arrivement: req.body.arrivement,
                    freedom: req.body.freedom,
                    ward_fk: JSON.parse(req.body.ward).id,
                    regime_fk: JSON.parse(req.body.regime).id
                }).then(
                (prisoner) => {
                    req.body.programs.forEach((program) => {
                        models.prisoner_program.create({
                            prisoner_fk: prisoner.dataValues.id,
                            program_fk: JSON.parse(program).id
                        }).then(() => {
                            req.body.reputations.forEach((reputation) => {
                                models.reputation_prisoner.create({
                                    prisoner_fk: prisoner.dataValues.id,
                                    reputation_fk: JSON.parse(reputation).id
                                }).then(() => {}, (err) => {
                                    res.sendStatus(500);
                                });
                            });

                        }, (err) => {
                            res.sendStatus(500);
                        });
                    });
                },
                (error) => {
                    res.sendStatus(500);
                });
        });
};
