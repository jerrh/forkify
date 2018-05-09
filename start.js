const mongoose = require('mongoose');

// Import environmental variables from variables.env 
require('dotenv').config({ path: 'variables.env' });

// Connect to db and handle bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`Bad connection → ${err.message}`);
});

// Import models
require('./models/Store');
require('./models/User');
require('./models/Review');

// Start app
const app = require('./app');
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
