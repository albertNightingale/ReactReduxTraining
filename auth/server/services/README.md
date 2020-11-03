# Passport.js 
This file holds code for authentication. It contains all the logic that are used in authentication. This includes the data encoders. 
## There are two ways of authentication in the file: 
Both ways are served as middleware in Router.js file. 
1. Key is the user email and the not yet encrypted password. This method of authentication is for log in or sign up with email and password. The password will be decrypted here and passed to the next middleware. 
2. Authenticate with a jwt token, encoded by a secret and the userID, and provided upon a successful signup or signin request. Decode the token to obtain userID, where the userID is expected to be found in the database. If the ID is found, then the request is authenticated. This method of authentication is for all authenticated pages where there is no need for reentering password. There is a SECURITY problem with this, however. All people authenticated will see the page, as the database is only checking if that ID exist. This means that there is no personalization of the page at this point. **Have the user be passed and accessible by the response in router request handler, then the response could respond the user with user's personalizations.**


