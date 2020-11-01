const express = require('express'); // import in es6
const http = require('http') 
const bodyParser = require('body-parser');
const morgan = require('morgan'); 
const { listenerCount } = require('process');
const app = express();
const router = require('./router'); 
const mongoose = require('mongoose');

////////// DB Setup
const connectInfo = 'mongodb://localhost:auth/auth';

mongoose.connect(connectInfo, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('DB Connected!')) 
.catch(err => {
    console.log("DB Connection Error: " + err.message);
});


///// App Setup

// middleware of the request 
app.use(morgan('combined'));   // morgan is for logging incoming requests
app.use(bodyParser.json({type: '*/*'}));   // parse incoming requests  
router(app); 


///// Server Setup
// set up the port 
const port = process.env.PORT || 3090; // unless there is an environment, otherwise set port to 3090
const server = http.createServer(app);  // create a server that knows how to receive request
server.listen(port); // the server will now listen to the port

console.log('Server listening on ' + port);
