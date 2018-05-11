require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0')
const massive = require('massive');
const bodyParser = require('body-parser');
const checkForSession = require('../server/middlewares/checkForSessions');
const loginController = require('./controllers/loginController');
const tripsController = require('./controllers/tripsController');
const userController = require('./controllers/userController');


const {
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING
} = process.env


const app = express();

massive(CONNECTION_STRING).then(db =>{
    app.set('db', db)
})

app.use(bodyParser.json())

app.use(session({
    secret:SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:300000,
        httpOnly: true
    }
}))

app.use(checkForSession)

app.use(passport.initialize())
app.use(passport.session())

passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid email profile'
},
    function (accessToken, refreashToken, extraParams, profile, done) {
        const db = app.get('db')
        db.find_user([profile.id]).then(users => {
            if (!users[0]) {
                db.create_user([profile.displayName, profile.id]).then(res => {
                    return done(null, res[0].auth_id)
                })
            } else {
                return done(null, users[0].auth_id)
            }
        })

    }
))

passport.serializeUser((id, done) => {
    return done(null, id)
})

passport.deserializeUser((id, done) => {
    
    app.get('db').find_user([id]).then(res => {
        
        return done(null, res[0])
    })
})
app.post('/api/updateuserprofile', userController.updateProfile)
app.get('/api/getuserprofile', userController.getUserProfile)
app.get(`/api/getusertrips`, tripsController.getTrips)
app.get('/api/destroy', loginController.destroy)
app.get('/auth', passport.authenticate('auth0'))
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: `${process.env.HOMEPAGE}#/dashboard`,
    failureRedirect: `${process.env.HOMEPAGE}`
}))

app.listen(SERVER_PORT, ()=> console.log(`Listening on port: ${SERVER_PORT}`))