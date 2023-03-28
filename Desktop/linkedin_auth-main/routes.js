const passport = require('passport');
const express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/index.ejs');
});

router.get('/failure', (req, res) => {
    res.render('pages/fail.ejs');
});

router.get('/profile', isLoggedIn, (req, res) => {
    console.log(req.user)
    res.render('pages/profile.ejs', {
        user: req.user,
        photo: req.user.photos[0].value
    });
});

router.get('/auth/linkedin', passport.authenticate('linkedin', {
    scope: ['r_emailaddress', 'r_liteprofile'],
}));

router.get('/auth/linkedin/callback',
    passport.authenticate('linkedin', {
        successRedirect: '/profile',
        failureRedirect: '/failure'
    }));
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
module.exports = router;