import {MySQL} from 'mysql-promisify';

const db = new MySQL({
  host: '127.0.0.1',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  charset: 'utf8',
  database: 'fantastical',
  timeout: 60000
});

export default db;
