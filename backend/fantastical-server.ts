import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import apiRouter from './routers';

dotenv.config({path: __dirname + '/.env'});
// eslint-disable-next-line
import './initialize-db';


const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json())

// cors
app.use((req, res, next) => {

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  next();
});

// routing
app.use('/api', apiRouter);

app.get('/', function (req, resp) {
  resp.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);
