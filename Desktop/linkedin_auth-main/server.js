const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const routes = require('./routes.js');
const config = require('./config')

app.set('view engine', 'ejs');

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: ''
}));

//new comment for git practice session
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, cb)=>{
    cb(null, user);
});
passport.deserializeUser((obj, cb)=>{
    cb(null, obj);
});

passport.use(new LinkedInStrategy({
    clientID: config.linkedinAuth.clientID,
    clientSecret: config.linkedinAuth.clientSecret,
    callbackURL: config.linkedinAuth.callbackURL,
    scope: config.linkedinAuth.scope,
    state: true
},(token, tokenSecret, profile, done)=>{
    return done(null, profile);
}
));

app.use('/', routes);

const port = 3000;

app.listen(port, () => {
    console.log('App listening on port ' + port);
});