const Todo = require("../models/todo");

function getUniqueStr(myStrong) {
  var strong = 1000;
  if (myStrong) strong = myStrong;
  return (
    new Date().getTime().toString(16) +
    Math.floor(strong * Math.random()).toString(16)
  );
}

const mysql = require("mysql");
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

exports.createTodo = (req, res, next) => {
  const newTodo = new Todo(getUniqueStr(), req.body.text, req.body.isDone);
  connection.query(
    "insert into todo_list(id, text, isDone) values(?, ?, ?)",
    [newTodo.id, newTodo.text, newTodo.isDone],
    (error, results, fields) => {
      if (error) {
        console.log("createTodo: err");
        throw error;
      }
      res.status(201).json({ message: "created Todos", createdTodo: newTodo });
    }
  );
};

exports.getTodos = (req, res, next) => {
  connection.query("SELECT * FROM todo_list", (error, results, fields) => {
    res.status(202).json({ todos: results });
  });
};

exports.updateTodo = (req, res, next) => {
  const todoId = req.params.id;
  const updateTodo = new Todo(todoId, req.body.text, req.body.isDone);
  connection.query(
    "UPDATE todo_list SET text=?, isDone=? WHERE id=?",
    [updateTodo.text, updateTodo.isDone, updateTodo.id],
    (error, result, fields) => {
      if (error) {
        console.log(error);
      }
      res
        .status(203)
        .json({ message: "updated Todos", updatedTodo: updateTodo });
    }
  );
};

exports.deleteTodo = (req, res, next) => {
  const todoId = req.params.id;

  connection.query(
    "DELETE from todo_list WHERE id = ?",
    todoId,
    (error, result, fields) => {
      if (error) {
        console.log(error);
      }
      res.status(204).json({ message: "Deleted Todos" });
    }
  );
};
