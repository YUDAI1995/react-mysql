import React from "react";
import { Todo } from "../models/Todolist.model";
import "../styles/TodoList.scss";

interface TodoListProps {
  todos: Todo[];
  onCheckHandler: (todo: Todo) => void;
  onDeleteTodo: (id: string) => void;
}

export const TodoList:React.FC<TodoListProps> = (props) => {

  return (
    <ul className="TodoList">
      {props.todos.map((todo) => (
        <li
          className={todo.id}
          key={todo.id}
          onClick={props.onCheckHandler.bind(null, todo)}
        >
          <div className="todoItem">
            <div className="checkBox">
              <input
                type="checkbox"
                checked={todo.isDone}
                onChange={() => {}}
              />
            </div>
            <p className="text">{todo.text}</p>
          </div>
          <button
            onClick={props.onDeleteTodo.bind(null, todo.id)}
            className="deleteBtn"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
