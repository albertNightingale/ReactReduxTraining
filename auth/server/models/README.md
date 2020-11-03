# user.js
this file contains a model class named **user**. The represents the identity of the person accessing the website and its application.The object is implemented by **mongoose.Schema** and contains methods and properties directly linked to the DB data structure. 

## user object: 
Storaging a user object takes place in **controller.authentication.signup** function
1. email: the email of the user, stored to the database after double checking that it is unique. the email is required to be string, all lower case, and unique. To add restrictions, programmers can make edits to the userSchema in its declaration
2. password: the password of the user, when stored to the datbase, is encrypted. It is encrypted in the **pre** function within the **user** file. There is no restriction in the password other than requiring it to be a string. To add restrictions, programmers can make edits to the userSchema in its declaration

## pre function call: 
Before saving data to the database, the **pre** function, a function inherited from **mongoose.Schema**, will be called. This function will encrypt the password before storing it to the database. 

## user class functions: comparePassword
Compare password will automatically compare the unencrypted password with the decrypted password in the database. It does so by decrupt the current password with the same secret and see if they match. Returns a call back when the function comparing is complete