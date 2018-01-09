module.exports = (router, staff) => {
    router.route('/staff')
            .get((req, res) => {
                    staff.count()
                        .then((data) => { res.json(data); });
            }).post((req, res) => {
                staff.create(req.body)
                    .then(() => { console.log("Successfully saved!"); });
            });
};
