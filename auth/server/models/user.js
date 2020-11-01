/*****  
 * define a user, a user has two properties
 * - Username: string, unique, 
 * - Password: string
 */

 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 const bcrypt = require('bcrypt-nodejs');

 //// define model, create a new schema
 const userSchema = new Schema( 
    {
        email: 
            {
                type: String, 
                unique: true, 
                lowercase: true
            },
        password: 
            {
                type: String
            }
    } 
);

//// on Save Hook, encrypt the password

// before the model gets saved, run the function
userSchema.pre('save', function(next){ 
    const user = this; // get access to the user model, which is a javascript class

    // generate a salt then run callback when ready. 
    bcrypt.genSalt(10, function(err, salt){
        if (err) { return next(err); }

        // hash(encrypt) our password using the salt
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) { return next(err); }
            user.password = hash; // hash is the encrypted password
            next(); // next will save the model
        }); 
    }); 
});

// add a function for the UserSchema object
userSchema.methods.comparePassword = function(candidatePassword, callback) {
    // compare the enteredPassword with the real password. call the Callback when done
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
            return callback(err);
        }

        callback(null, isMatch); 
    })
}

//// create the model class
const modelClass = mongoose.model('user', userSchema); // this is actually a class object

//// export the model 
module.exports = modelClass;