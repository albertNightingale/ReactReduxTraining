const config = require('../config')
const User = require('../models/user')
const jwt = require('jwt-simple')

// encode the user and combine it with secret 
function tokenForUser (user) {
    
    // Encoding the timestamp does not work
    const timestamp = new Date().getTime(); 
    // return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
    return jwt.encode({ sub: user.id }, config.secret);
}


// a sign in function
exports.signin = function(req, res, next) {
    // here the user's email/password is authed through the local strategy middleware

    // need to give them a token
    const userToken = {
        token: tokenForUser(req.user)
    }

    res.send(userToken); 
}


// a sign up function
exports.signup = function (req, res, next) {
    // see if a user with the given email exists
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).send("You must provide an email and password"); 
    }
 
    // if it does exist, return an error
    User.findOne({email: email}, (err, existingUser) => {
        if (err) // if there is an error with reading/connecting the database
        {
            return next(err);
        }

        // if the email does exist, meaning that the email cannot be used to sign up this account
        if (existingUser) {
            // unprocessible entity response indicating that the email is in use
            return res.status(422).send({error: 'Email is in use'}); 
        }

        // if a user with email does not exist, create and save user record
        const user = new User({
            email: email,
            password: password
        })

        user.save( err => {
            if (err) { return next(err); }

            // respond to request indicating the user was created
            res.json( { token: tokenForUser(user) } );
        });
    });
}

