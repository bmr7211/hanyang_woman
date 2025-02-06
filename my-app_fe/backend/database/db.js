// /Users/shinji81/my-app_fe/backend/database/db.js
// 담당 : 지윤
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '***********',
  database: 'ais'
});

db.promise();

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

module.exports = db;
