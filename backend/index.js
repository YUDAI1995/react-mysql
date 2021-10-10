const express = require("express");
const mysql = require("mysql");

const app = express();
const path = require("path");
const port = process.env.PORT || 3001;

const json = require("body-parser");
app.use(json());

const todoRoutes = require("./routes/todos");

// Router
app.use(express.static(path.join(__dirname, "../client/build")), todoRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

// Database Connection
const CLEARDB_URL = process.env.CLEARDB_DATABASE_URL;
const params = CLEARDB_URL.replace("mysql://", "").split(/[:@/?]/);

const connection = mysql.createConnection({
  host: params[2],
  user: params[0],
  password: params[1],
  database: params[3],
  port: "3306",
});

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "express_db",
// });

// connection.connect((err) => {
//   if (err) {
//     console.log("ERROR.CONNECTION_DB: ", err);
//   }

//   const sql =
//     "CREATE TABLE IF NOT EXISTS todo_list (id VARCHAR(255) NOT NULL PRIMARY KEY, text VARCHAR(255) NOT NULL, isDone BOOLEAN NOT NULL)";
//   connection.query(sql, function (err, result) {
//     if (err) throw err;
//   });
// });

// const handleDisconnect = () => {
//   console.log("[RUN]INFO.CONNECTION_DB: ");

//   connection.connect((err) => {
//     if (err) {
//       console.log("ERROR.CONNECTION_DB: ", err);
//       setTimeout(handleDisconnect, 1000);
//     }
//   });

//   //error('PROTOCOL_CONNECTION_LOST')時に再接続
//   connection.on("error", function (err) {
//     console.log("ERROR.DB: ", err.code);
//     if (err.code === "PROTOCOL_CONNECTION_LOST") {
//       console.log("ERROR.CONNECTION_LOST: ", err);
//       handleDisconnect();
//     } else {
//       throw err;
//     }
//   });
// };
// handleDisconnect();

app.listen(port, () => {
  console.log(`Running server on port ${port}`);
});
