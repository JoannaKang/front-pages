
// Import dependencies
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const router = require('./server/routers/router');
const mongoose = require('mongoose');
const newsScraper = require('./server/scrapers/index');


// If app is in dev mode
if (process.env.NODE_ENV !== 'production') {
  // Replace process.env variables with variables in .env file
  require('dotenv').config();
  // Inform developer to use React's localhost port when testing server
  app.get('/', (req, res) => res.status(200).send(`Looks like you are in development mode: Back-end is now listening on port ${process.env.PORT}. Please start front-end server and use while testing the app (http://localhost:3000)`));
}

// Parse API requests as JSON
app.use(express.json());
// For api requests, rout them through router file
app.use(router);

//login middleware
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRouter = require('./server/routers/auth_router');
const config = require('./config');

app.use(
  cookieSession({
    maxAge: 1000 * 60 * 60 * 24 * 30, // 1month
    keys: [config.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRouter);

// Serve static files (index.html) from from build folder
app.use(express.static(path.join(__dirname, '/client/build')));
// Leverage React routing, return requests to React
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

// newsScraper();
// setInterval(() => {
//   newsScraper();
//   console.log('called in server');
// }, 300000);

// Connect to MongoDB and listen for new requests
http.listen(process.env.PORT, async (req, res) => { // eslint-disable-line no-unused-vars
  try {
    await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    // Function that finds all broadcasts in DB and start their timers
    console.log(`Server connected to DB - listening on port: ${process.env.PORT}`);
  } catch (error) {
    console.log('Could not connect to database', error);  // eslint-disable-line no-console
  }
});


