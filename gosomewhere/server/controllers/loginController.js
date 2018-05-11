module.exports = {

    destroy:(req,res,next)=>{
        const db = req.app.get('db')
        req.session.destroy()
        res.redirect('https://alxdev.auth0.com/v2/logout?returnTo=http://localhost:3000/#/')
    },
}