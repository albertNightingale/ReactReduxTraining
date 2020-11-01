/*****
 * the route handler
 */


const passportService = require('./services/passport');

const Authentication = require('./controller/authentication');
const passport = require('passport');

// set a require auth middleware to force some of the passport pass through
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', {session: false}); 

module.exports = function router(app) {   
    app.get('/', requireAuth, (req, res) => {
        res.send( { hi: 'there' });
    });
    app.post('/signin', requireSignin, Authentication.signin); 
    app.post('/signup', Authentication.signup);
}