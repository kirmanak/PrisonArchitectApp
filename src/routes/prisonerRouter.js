module.exports = (router, models) => {
    const isLoggedIn = (req, res, next) => {
        if (req.isAuthenticated()) next();
        else res.sendStatus(403);
    };

    router.route('/prisoner/reputations')
        .get((req, res) => {
            // noinspection Annotator
            models.reputation.findAll().then(
                (reputations) => {
                    res.send(reputations);
                },
                (error) => {
                    console.error(error);
                    res.sendStatus(500);
                });
        });

    router.route('/prisoner/wards')
        .post((req, res) => {
            if (!req.body.id) {
                console.error(req.body);
                res.sendStatus(400);
                return;
            }
            models.room.findAll({
                required: true,
                where: {assignment: 'Камера'},
                include: [
                    {
                        model: models.access,
                        required: true,
                        include: [{
                            model: models.regime,
                            required: true,
                            where: {id: req.body.id}
                        }]
                    }]
            }).then((resultsArray) => {
                    res.send(resultsArray);
                },
                (error) => {
                    console.error(error);
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
                    console.error(error);
                    res.sendStatus(500);
                });
        });

    router.route('/prisoner/programs')
        .post((req, res) => {
            if (!req.body.id) {
                console.error(req.body);
                res.sendStatus(400);
                return;
            }
            models.program.findAll({
                include: [{
                    model: models.room,
                    include: [{
                        model: models.access,
                        include: [{
                            model: models.regime,
                            where: {id: req.body.id},
                            required: true
                        }],
                        required: true
                    }],
                    required: true
                }],
                required: true,
            }).then((results) => {
                res.send(results);
            }, (error) => {
                console.error(error);
                res.sendStatus(500);
            });
        });

    router.route('/prisoner')
        .get((req, res) => {
            // noinspection Annotator
            models.prisoner.count().then(
                (data) => {
                    res.json(data);
                });
        })
        .put(isLoggedIn, (req, res) => {
            if (!req.body.fullname || !req.body.arrivement ||
            !req.body.freedom || !req.body.ward_fk || !req.body.regime_fk ||
            !req.body.reputations || !req.body.programs) {
                res.sendStatus(400);
                return;
            }
            // noinspection Annotator
            // noinspection JSCheckFunctionSignatures
            // noinspection Annotator
            models.prisoner.create({
                fullname: req.body.fullname,
                arrivement: req.body.arrivement,
                freedom: req.body.freedom,
                ward_fk: req.body.ward_fk,
                regime_fk: req.body.regime_fk
            }).then((prisoner) => {
                req.body.programs.forEach((program_fk) => {
                    // noinspection Annotator
                    models.prisoner_program.create({
                        prisoner_fk: prisoner.dataValues.id,
                        program_fk: program_fk
                    }).then(() => {}, (error) => {
                        console.error(error);
                        res.sendStatus(500);
                    });
                });
                req.body.reputations.forEach((reputation_fk) => {
                    // noinspection Annotator
                    models.reputation_prisoner.create({
                        prisoner_fk: prisoner.dataValues.id,
                        reputation_fk: reputation_fk
                    }).then(() => {}, (error) => {
                        console.error(error);
                        res.sendStatus(500);
                    });
                });
                res.sendStatus(200);
            }, (error) => {
                console.error(error);
                res.sendStatus(500);
            });
        })
        .post(isLoggedIn, (req, res) => {
            if (!req.body.id) {
                res.sendStatus(400);
                return;
            }
            // noinspection Annotator
            models.prisoner.destroy( { where: { id: req.body.id } }).then((result) => {
                    res.sendStatus(200);
                }, (error) => {
                    console.error(error);
                    res.sendStatus(500);
                });
        })
        .patch(isLoggedIn, (req, res) => {
            if (!req.body.id || !req.body.freedom ||
                !req.body.ward_fk || !req.body.regime_fk ||
                !req.body.reputations || !req.body.programs) {
                res.sendStatus(400);
                return;
            }
            // noinspection Annotator
            // noinspection JSCheckFunctionSignatures
            // noinspection Annotator
            models.prisoner.update({
                freedom: req.body.freedom,
                ward_fk: req.body.ward_fk,
                regime_fk: req.body.regime_fk
            }, {
                where: { id: req.body.id }
            }).then((prisoner) => {
                // noinspection Annotator
                models.prisoner_program.destroy({ where: { prisoner_fk: req.body.id } });
                // noinspection Annotator
                models.reputation_prisoner.destroy({ where: { prisoner_fk: req.body.id } });
                const promises = [];
                req.body.programs.forEach((program_fk) => {
                    // noinspection Annotator
                    promises.push(models.prisoner_program.create({
                        prisoner_fk: req.body.id,
                        program_fk: program_fk
                    }));
                });
                req.body.reputations.forEach((reputation_fk) => {
                    // noinspection Annotator
                    promises.push(models.reputation_prisoner.create({
                        prisoner_fk: req.body.id,
                        reputation_fk: reputation_fk
                    }))
                });
                Promise.all(promises).then(() => {
                    res.sendStatus(200);
                }, (error) => {
                    console.error(error);
                    res.sendStatus(500);
                });
            }, (error) => {
                console.error(error);
                res.sendStatus(500);
            });

        });

    router.route('/prisoner/search')
        .post((req, res) => {
            if (!req.body.fullname) {
                res.sendStatus(400);
                return;
            }
            // noinspection Annotator
            models.prisoner.findAll({
                where: { fullname: req.body.fullname },
                include: [
                    models.regime,
                    models.program,
                    models.reputation,
                    models.room,
                ]
            }).then((results) => {
                res.send(results);
            }, (error) => {
                console.error(error);
                res.sendStatus(500);
            });
        });
};
