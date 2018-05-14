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


    },
    createTrip:(req,res,next)=>{
        const db = req.app.get('db')
        const {tripName, country, city, state, start, end, desc} = req.body;
        db.createNewTrip([req.user.id, tripName, country, city, state, start, end, desc]).then(response =>{
            db.addTravelers([response[0].id, response[0].trip_owner_id])
            res.status(200).send('Trip Added')
        })
    },
    updateTrip:(req,res,next)=>{
        console.log(req.body)
        const db = req.app.get('db')
        db.updateTrip([req.body.tripID, req.body.tripName ,req.body.country, req.body.city, req.body.state, req.body.start, req.body.end, req.body.desc]).then(response=>{
            res.status(200).send('Update Successfull!')
        })
    },

    leaveTrip:(req,res,next)=>{
        const db = req.app.get('db')
        console.log(req.params)
        db.leaveTrip([req.params.tripID, req.user.id]).then(response =>{
            res.status(200).send('User Left Trip')
        })
    },
    deleteTrip:(req, res, next) =>{
        const db = req.app.get('db')
        db.deleteTrip([req.params.tripID])
    }
}
