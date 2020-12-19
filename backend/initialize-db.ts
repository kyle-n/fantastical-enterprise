// @TODO: With more time, I would write @types/mysql-promisify. I've contributed to @types/browser-or-node and @types/gsheets
// @ts-ignore
import {MySQL} from 'mysql-promisify';

global.db = new MySQL({
  host: '127.0.0.1',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  charset: 'utf8',
  database: 'fantastical',
  timeout: 60000
});

// @TODO: Create database and desired tables in code on startup if they do not exist
