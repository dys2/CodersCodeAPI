const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const server = express();

server.use(bodyParser.json({limit: '50mb'}));
server.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
server.use(cors());



mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

const db = mongoose.connection;
	db.on('error', console.error.bind(console, 'database connection error...'));
  db.once('open', () => console.log('Db connection active...'));
  

const routes = require('./api/routes/routes');
routes(server);

server.listen(8080, () => {
  console.log('server running on 8080')
});
