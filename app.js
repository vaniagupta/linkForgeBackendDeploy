const path = require('path');
const express = require('express');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('express-async-errors');

const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

const usersRouter = require('./controllers/users');
const linksRouter = require('./controllers/links');
const loginRouter = require('./controllers/login');
const logoutRouter = require('./controllers/logout');
const signupRouter = require('./controllers/signup');
const refreshRouter = require('./controllers/refresh');

app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.static('dist'));
app.use(cookieParser());
app.use(middleware.requestLogger);

// connect to db
// mongoose.connect(config.MONGODB_URI)
//   .then(() => {
//     logger.info('connected to MongoDB');
//   })
//   .catch((err) => {
//     logger.error('error connecting to MongoDB:', err.message);
//   });


const { MongoClient, ServerApiVersion } = require('mongodb');
//const uri = "mongodb+srv://vania1497be21:<password>@cluster0.vszjtji.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(config.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


app.use('/api/users', usersRouter);
app.use('/api/links', linksRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/signup', signupRouter);
app.use('/api/refresh', refreshRouter);

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

module.exports = app;
