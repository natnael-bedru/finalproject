require("dotenv").config();
const mysql = require("mysql2");

const conn = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

conn.connect(function (err) {
  if (err) {
    console.log("------------------------------------------------");
    console.log("[Connection to database failure!]");
    console.log("------------------------------------------------");
    console.log(JSON.stringify(err));
    console.log("------------------------------------------------");
    //console.error("error connecting: " + err.stack);
    return;
  }
  console.log("------------------------------------------------");
  console.log("[Connection to database successful]");
  console.log("------------------------------------------------");
  console.log(`|> Connected to database: ${conn._command.database}`);
  console.log(`|> Connected as id: ${conn.threadId}`);
  console.log(`|> User: ${conn._command.user}`);
  console.log(`|> Password: ${conn._command.password}`);
  console.log(`|> Host: ${conn.config.host}`);
  console.log(`|> Port: ${conn.config.port}`);
  console.log("------------------------------------------------");
});

module.exports = conn;
