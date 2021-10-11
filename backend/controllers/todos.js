const Todo = require("../models/todo");

const mysql = require("mysql");
const CLEARDB_URL = process.env.CLEARDB_DATABASE_URL;
const params = CLEARDB_URL.replace("mysql://", "").split(/[:@/?]/);

//Database Connection
const pool = mysql.createPool({
  host: params[2],
  user: params[0],
  password: params[1],
  database: params[3],
  port: "3306",
});

const sql =
  "CREATE TABLE IF NOT EXISTS todo_list (id VARCHAR(255) NOT NULL PRIMARY KEY, text VARCHAR(255) NOT NULL, isDone BOOLEAN NOT NULL)";
pool.query(sql, (error, results, fields) => {
  if (error) throw error;
});

exports.createTodo = (req, res, next) => {
  const newTodo = new Todo(req.body.id, req.body.text, req.body.isDone);

  pool.getConnection((error, connection) => {
    connection.query(
      "insert into todo_list(id, text, isDone) values(?, ?, ?)",
      [newTodo.id, newTodo.text, newTodo.isDone],
      (error, results, fields) => {
        if (error) {
          console.log(`createTodo Error: ${error}`);
          throw error;
        }
        res
          .status(201)
          .json({ message: "created Todos", createdTodo: newTodo });

        connection.release();
        // Handle error after the release.
        if (error) throw error;
      }
    );
  });
};

exports.getTodos = (req, res, next) => {
  pool.getConnection((error, connection) => {
    connection.query("SELECT * FROM todo_list", (error, results, fields) => {
      if (error) {
        console.log(`getTodos Error: ${error}`);
        throw error;
      }

      res.status(202).json({ todos: results });

      connection.release();
      if (error) throw error;
    });
  });
};

exports.updateTodo = (req, res, next) => {
  const todoId = req.params.id;
  const updateTodo = new Todo(todoId, req.body.text, req.body.isDone);

  pool.getConnection((error, connection) => {
    connection.query(
      "UPDATE todo_list SET text=?, isDone=? WHERE id=?",
      [updateTodo.text, updateTodo.isDone, updateTodo.id],
      (error, result, fields) => {
        if (error) {
          console.log(`updateTodo Error: ${error}`);
          throw error;
        }
        res
          .status(203)
          .json({ message: "updated Todos", updatedTodo: updateTodo });

        connection.release();
        if (error) throw error;
      }
    );
  });
};

exports.deleteTodo = (req, res, next) => {
  const todoId = req.params.id;

  pool.getConnection((error, connection) => {
    connection.query(
      "DELETE from todo_list WHERE id = ?",
      todoId,
      (error, result, fields) => {
        if (error) {
          console.log(`deleteTodo Error: ${error}`);
          throw error;
        }
        res.status(204).json({ message: "Deleted Todos" });

        connection.release();
        if (error) throw error;
      }
    );
  });
};
