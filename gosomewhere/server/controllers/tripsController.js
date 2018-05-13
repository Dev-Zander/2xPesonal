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
      let email = req.params.email.toUpperCase()
      let trip = req.params.tripID
      const db = req.app.get('db')
      db.findbyemail([email]).then(response =>{
          if(!response[0]){
              db.addToTrip([email]).then(response =>{
                  db.addTravelers([trip, response[0].id]).then(response =>{
                      res.status(200).send(true)
                  })
                 
              })
          }
          else if(response[0]){
              db.addTravelers([trip, response[0].id]).then(response =>{
                  res.status.send(true)
              })
          }
          
      })


    }
}