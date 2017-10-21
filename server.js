const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const server = express();

server.use(bodyParser.json({limit: '50mb'}));
server.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
server.use(cors());

const port = process.env.PORT || 5000

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://heroku_xk76h9r4:54m64u1qs8d89jvud60ue4a5mg@ds125565.mlab.com:25565/heroku_xk76h9r4', { useMongoClient: false });

const db = mongoose.connection;
	db.on('error', console.error.bind(console, 'database connection error...'));
  db.once('open', () => console.log('Db connection active...'));
  

const routes = require('./routes/routes');
routes(server);

server.listen(port, () => {
  console.log('server running')
});
