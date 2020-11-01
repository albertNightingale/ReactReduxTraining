/******
 * This file is to setup ways to authenticate a client. 
 * 
 * - jwtOptions is to take the encoded string by a secret string, and decode the string with the same 
 * secret. This is going to used whenever the user is logged in
 * - one option is 
 */

// Strategy is a strategy for verification

const User = require('../models/user');
const config = require('../config');

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;  
const ExtractJwt = require('passport-jwt').ExtractJwt;  
const LocalStrategy = require('passport-local'); // local database

/*************       JWT strategy of authentication          ***************/

//// set up options for JWT strategy
const jwtOptions = {
    // tell the strategy where to look for the authentication
    // tell strategy to find authentication from the request header under authorization tag
    jwtFromRequest: ExtractJwt.fromHeader('authorization'), 
    // tell the strategy to decode the payload encoded using the secret
    secretOrKey: config.secret
};

//// create JWT strategy              decoded jwt token
const jwtLogIn = new JwtStrategy (jwtOptions, (payload, done) => {
    // See if the user ID in the payload exists in our database
    // If it does, call 'done' with that user
    // otherwise call done without a user object
    User.findById(payload.sub, function (err, user) {
            // first argument is error, second argument is the object
        if (err) {  return done(err, false); }

        if (user) {
            done(null, user); 
        } 
        else {
            done(null, false); 
        }
    })
});

// Tell passport to use this strategy
passport.use(jwtLogIn)




///// create local strategy 
const localOptions = {
    usernameField: 'email'
}

const localLogIn = new LocalStrategy(localOptions, function(email, password, done) {
    // verify this email and password, call done with the user
    const emailLookUp = { 
        email: email
    };

    User.findOne(emailLookUp, (err, userSearchResult) => {
        if (err)  // not able to perform read operation
        {
            return next(err);
        }

        // the email is not found
        if (!userSearchResult)  // not able to find anything matching the emailLookUp 
        { 
            return done(null, false);
        }

        // if this is the correct email 

        // then check password (encrypt it and compare it with the password in the database)
        userSearchResult.comparePassword(password, function(err, isMatch) {
            if (err) { return done(err); }
            if (!isMatch) { return done(null, false); }

            return done(null, userSearchResult); 
        }) 
    });
});

// tell passport to use local strategy
passport.use(localLogIn); 