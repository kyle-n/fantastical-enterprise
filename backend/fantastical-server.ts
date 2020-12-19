import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import apiRouter from './routers';

const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json())

app.use('/api', apiRouter);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);
