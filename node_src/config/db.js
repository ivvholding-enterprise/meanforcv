// Mongoose Configuration
const mongoose = require('mongoose');
const keys = require('./keys');
mongoose.connect(keys.mongoDB.URI,{ useCreateIndex: true,
  useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
