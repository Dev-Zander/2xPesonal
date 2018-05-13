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
    },

    getTripDetails: (req, res, next) => {
        console.log('Hit')
        const db = req.app.get('db')
        db.getTripDetails([req.params.id]).then(response =>{
            res.status(200).send(response)
        })
    },

    getTravelers:(req,res,next) =>{
        const db = req.app.get('db')
        db.getTravelers([req.params.id]).then(response=>{
            res.status(200).send(response)
        })
    },
    inviteTraveler:(req,res,next)=>{
        const db = req.app.get('db')
        db.findbyemail([req.params.email]).then(travelers =>{
            if(!travelers[0]) {
                
            }
        })
        db.addTraveler([req.params.email, req.params.tripID]).then(response =>{
            res.status(200).send(response)
        })
    }
}