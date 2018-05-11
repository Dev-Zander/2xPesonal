module.exports = {
    getTrips: (req, res, next) => {
        const db = req.app.get('db')
        db.trip_list([req.user.id]).then(
            trips => {
                if (trips.length >= 1) {
                    return res.status(200).send(trips)
                } else { return res.status(500).send('No Trips') }
            }
        )
    }
}