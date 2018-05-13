module.exports = {
    getUserProfile:(req,res,next)=>{
    const db = req.app.get('db')
    db.find_user([req.user.auth_id]).then(profile =>{
        return res.status(200).send(profile)
    })
    
    },

    updateProfile:(req,res,next)=>{
        let modEmail = req.body.email.toUpperCase()
        console.log(req.user.id)
        const db = req.app.get('db')
        db.updateProfile([req.user.id, req.body.first_name, req.body.last_name, modEmail, req.body.airport_code, req.body.google_pay, req.body.apple_pay, req.body.zelle, req.body.venmo])
    }


}