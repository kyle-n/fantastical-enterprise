import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);
